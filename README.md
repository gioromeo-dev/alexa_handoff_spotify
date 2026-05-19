# Alexa Handoff Spotify

## English

A web tool that bridges Amazon Alexa and Spotify: it performs the Spotify OAuth 2.0 PKCE authorization flow and transfers playback to a target device, enabling Alexa skills to hand off music control to Spotify on a specific device.

No backend required — everything runs in the browser.

### How it works
1. Alexa (or any caller) opens `index.html` passing `client_id`, `device_name`, and optionally `show_devices` as query parameters.
2. The page redirects the user to Spotify's authorization endpoint using PKCE.
3. After the user grants access, Spotify redirects back to `callback.html` with an authorization code.
4. The app exchanges the code for an access token and transfers playback to the specified device.
   - If `show_devices=true`, the user is shown a list of available devices to pick from.
   - If `device_name` is provided but not found among active devices, the device list is shown as a fallback.

---

### Setup guide

#### 1. Host the files
Upload all files (`index.html`, `callback.html`, `app.js`, `main.css`, `assets/`) to any static hosting service (GitHub Pages, Netlify, Apache, etc.).

Example base URL: `https://yourdomain.com/alexa-handoff/`

#### 2. Create a Spotify Developer app
1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and log in.
2. Click **Create app**.
3. Fill in any name and description.
4. Under **Redirect URIs**, add:
   ```
   https://yourdomain.com/alexa-handoff/callback.html
   ```
5. Under **APIs used**, select **Web API**.
6. Save and copy your **Client ID**.

#### 3. Build the URL
Open `index.html` with the following query parameters:

| Parameter | Required | Description |
|---|---|---|
| `client_id` | Yes | Your Spotify app Client ID |
| `device_name` | No* | Exact name of the target Spotify device |
| `show_devices` | No* | `true` to show a device picker |

\* At least one of `device_name` or `show_devices=true` should be provided.

**Examples:**

Transfer directly to a named device (e.g. an Echo Dot):
```
https://yourdomain.com/alexa-handoff/index.html?client_id=YOUR_CLIENT_ID&device_name=Echo%20Dot
```

Show a device picker so the user can choose:
```
https://yourdomain.com/alexa-handoff/index.html?client_id=YOUR_CLIENT_ID&show_devices=true
```

#### 4. Authorize
The first time you open the URL, Spotify will ask you to log in and grant permissions. After that, playback is transferred automatically.

> **Note:** The device must be active on Spotify (playing or paused) for it to appear in the list. Open Spotify on the target device before running the handoff.

---

### Use with Alexa

In your Alexa Skill, use an **Account Linking** card or a simple `speak` + URL to send the user to the handoff page. A typical flow:

1. User asks Alexa to hand off music to Spotify.
2. Alexa opens the URL (via a card in the Alexa app or a companion app deep link).
3. The user authorizes once; subsequent calls transfer playback silently.

---

### Tech Stack
- HTML5, CSS3, JavaScript (vanilla)
- Spotify Web API (PKCE OAuth 2.0 — no backend, no client secret)

---

## Italiano

Uno strumento web che collega Amazon Alexa e Spotify: esegue il flusso di autorizzazione OAuth 2.0 PKCE di Spotify e trasferisce la riproduzione su un dispositivo di destinazione. Non richiede backend — tutto gira nel browser.

### Come funziona
1. Alexa (o qualsiasi chiamante) apre `index.html` passando `client_id`, `device_name` e opzionalmente `show_devices` come parametri query.
2. La pagina reindirizza l'utente all'endpoint di autorizzazione di Spotify tramite PKCE.
3. Dopo che l'utente concede l'accesso, Spotify reindirizza a `callback.html` con un codice di autorizzazione.
4. L'app scambia il codice per un access token e trasferisce la riproduzione al dispositivo specificato.
   - Se `show_devices=true`, viene mostrata una lista di dispositivi tra cui scegliere.
   - Se `device_name` è fornito ma non trovato tra i dispositivi attivi, la lista viene mostrata come fallback.

---

### Guida alla configurazione

#### 1. Carica i file
Carica tutti i file (`index.html`, `callback.html`, `app.js`, `main.css`, `assets/`) su qualsiasi hosting statico (GitHub Pages, Netlify, Apache, ecc.).

Esempio URL base: `https://tuodominio.com/alexa-handoff/`

#### 2. Crea un'app Spotify Developer
1. Vai su [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) e accedi.
2. Clicca **Create app**.
3. Inserisci un nome e una descrizione qualsiasi.
4. Sotto **Redirect URIs**, aggiungi:
   ```
   https://tuodominio.com/alexa-handoff/callback.html
   ```
5. Sotto **APIs used**, seleziona **Web API**.
6. Salva e copia il tuo **Client ID**.

#### 3. Costruisci l'URL
Apri `index.html` con i seguenti parametri query:

| Parametro | Obbligatorio | Descrizione |
|---|---|---|
| `client_id` | Sì | Il Client ID della tua app Spotify |
| `device_name` | No* | Nome esatto del dispositivo Spotify di destinazione |
| `show_devices` | No* | `true` per mostrare un selettore di dispositivi |

\* Almeno uno tra `device_name` o `show_devices=true` dovrebbe essere fornito.

**Esempi:**

Trasferimento diretto a un dispositivo per nome (es. Echo Dot):
```
https://tuodominio.com/alexa-handoff/index.html?client_id=TUO_CLIENT_ID&device_name=Echo%20Dot
```

Mostra un selettore di dispositivi:
```
https://tuodominio.com/alexa-handoff/index.html?client_id=TUO_CLIENT_ID&show_devices=true
```

#### 4. Autorizza
La prima volta che apri l'URL, Spotify chiederà di accedere e concedere i permessi. Dopo di che, la riproduzione viene trasferita automaticamente.

> **Nota:** Il dispositivo deve essere attivo su Spotify (in riproduzione o in pausa) per apparire nella lista. Apri Spotify sul dispositivo di destinazione prima di eseguire l'handoff.

---

### Utilizzo con Alexa

Nella tua Alexa Skill, usa una card **Account Linking** o una semplice `speak` + URL per inviare l'utente alla pagina di handoff. Flusso tipico:

1. L'utente chiede ad Alexa di trasferire la musica su Spotify.
2. Alexa apre l'URL (tramite una card nell'app Alexa o un deep link dell'app companion).
3. L'utente autorizza una volta; le chiamate successive trasferiscono la riproduzione in automatico.

---

### Stack tecnologico
- HTML5, CSS3, JavaScript (vanilla)
- Spotify Web API (OAuth 2.0 PKCE — nessun backend, nessun client secret)

---

*Author: Giovanni Romeo*
