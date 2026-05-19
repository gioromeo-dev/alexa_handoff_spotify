async function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get("client_id");
  const deviceName = decodeURIComponent(urlParams.get("device_name"));
  const showDevice = urlParams.get("show_devices");

  localStorage.setItem("client_id", clientId);
  localStorage.setItem("device_name", deviceName);
  localStorage.setItem("show_devices", showDevice);

  const codeVerifier = generateRandomString(64);
  const codeChallenge = base64encode(await sha256(codeVerifier));
  const state = generateRandomString(16);

  localStorage.setItem("code_verifier", codeVerifier);
  localStorage.setItem("oauth_state", state);

  const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname.replace(/[^/]*$/, "");
  const redirectUri = baseUrl + "callback.html";
  const scope = "user-read-private user-read-email user-read-playback-state user-modify-playback-state";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  authUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge
  }).toString();

  window.location.href = authUrl.toString();
}

async function onCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const error = urlParams.get("error");

  // Spotify returned an auth error (e.g. user denied) or code is missing
  if (error || !code) {
    showError();
    return;
  }

  if (state !== localStorage.getItem("oauth_state")) {
    showError();
    return;
  }

  const clientId = localStorage.getItem("client_id");
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!clientId || !codeVerifier) {
    showError();
    return;
  }

  // Remove code from URL immediately to prevent invalid_grant on page refresh
  history.replaceState({}, "", window.location.pathname);

  const redirectUri = window.location.protocol + "//" + window.location.host + window.location.pathname;

  const body = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    })
  });

  const response = await body.json();

  if (!response.access_token) {
    showError();
    return;
  }

  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);

  getDevices();
}

async function getDevices() {
  const accessToken = localStorage.getItem("access_token");
  const deviceName = localStorage.getItem("device_name");
  const showDevice = localStorage.getItem("show_devices");

  const body = await fetch("https://api.spotify.com/v1/me/player/devices", {
    method: "GET",
    headers: { "Authorization": "Bearer " + accessToken }
  });
  const response = await body.json();
  const devices = response.devices;

  if (!devices) {
    showError();
    return;
  }

  if (showDevice === "true") {
    showDeviceList(devices);
  } else {
    const deviceID = devices.find(d => d.name === deviceName)?.id;
    if (!deviceID) {
      showDeviceList(devices);
      return;
    }
    localStorage.setItem("device_id", deviceID);
    setNewDevice();
  }
}

function showDeviceList(devices) {
  document.getElementById("status").style.display = "none";
  document.getElementById("box-devices").style.display = "flex";
  const container = document.getElementById("devices");
  container.innerHTML = "";
  devices.forEach(d => {
    const btn = document.createElement("button");
    btn.className = "device";
    btn.textContent = d.name;
    btn.onclick = () => selectDevice(d.id);
    container.appendChild(btn);
  });
}

function selectDevice(deviceId) {
  localStorage.setItem("device_id", deviceId);
  document.getElementById("box-devices").style.display = "none";
  document.getElementById("status").style.display = "flex";
  setNewDevice();
}

async function setNewDevice() {
  const accessToken = localStorage.getItem("access_token");
  const deviceID = localStorage.getItem("device_id");

  const response = await fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ device_ids: [deviceID] })
  });

  if (response.ok) {
    document.getElementById("img-loader").style.display = "none";
    document.getElementById("img-done").style.display = "block";
    document.getElementById("text-status").innerHTML = "Connected";
  } else {
    showError();
  }
}

function showError() {
  document.getElementById("img-loader").style.display = "none";
  document.getElementById("img-error").style.display = "block";
  document.getElementById("text-status").innerHTML = "ERROR";
}

function sha256(plain) {
  const encoder = new TextEncoder();
  return window.crypto.subtle.digest("SHA-256", encoder.encode(plain));
}

function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
