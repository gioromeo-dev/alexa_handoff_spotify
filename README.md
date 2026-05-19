# Alexa Handoff Spotify

## English

A web tool that bridges Amazon Alexa and Spotify: it performs the Spotify OAuth 2.0 authorization flow and transfers playback to a target device, enabling Alexa skills to hand off music control to Spotify on a specific device.

### How it works
1. Alexa (or any caller) opens the page passing `client_id`, `device_name`, and optionally `show_devices` as query parameters.
2. The page redirects the user to Spotify's authorization endpoint.
3. After the user grants access, Spotify redirects to `callback.html` with an authorization code.
4. The app exchanges the code for an access token and transfers playback to the specified device.

### Features
- Spotify OAuth 2.0 authorization flow
- Automatic device selection and playback transfer
- Minimal UI with loading/success/error states

### Tech Stack
- HTML5, CSS3, JavaScript (vanilla)
- Spotify Web API

### Requirements
A registered Spotify Developer application with the redirect URI pointing to `callback.html` on your host.

### Configuration
Pass the following query parameters when loading `index.html`:

| Parameter | Description |
|---|---|
| `client_id` | Spotify app Client ID |
| `device_name` | Target Spotify device name |
| `show_devices` | (optional) `true` to list available devices |

---

## Italiano

Uno strumento web che collega Amazon Alexa e Spotify: esegue il flusso di autorizzazione OAuth 2.0 di Spotify e trasferisce la riproduzione su un dispositivo di destinazione, permettendo alle Alexa Skill di delegare il controllo della musica a Spotify su un dispositivo specifico.

### Come funziona
1. Alexa (o qualsiasi chiamante) apre la pagina passando `client_id`, `device_name` e opzionalmente `show_devices` come parametri query.
2. La pagina reindirizza l'utente all'endpoint di autorizzazione di Spotify.
3. Dopo che l'utente concede l'accesso, Spotify reindirizza a `callback.html` con un codice di autorizzazione.
4. L'app scambia il codice per un access token e trasferisce la riproduzione al dispositivo specificato.

### Funzionalità
- Flusso di autorizzazione OAuth 2.0 di Spotify
- Selezione automatica del dispositivo e trasferimento della riproduzione
- UI minimale con stati di caricamento/successo/errore

### Stack tecnologico
- HTML5, CSS3, JavaScript (vanilla)
- Spotify Web API

### Requisiti
Un'applicazione Spotify Developer registrata con il redirect URI che punta a `callback.html` sul tuo host.

### Configurazione
Passa i seguenti parametri query al caricamento di `index.html`:

| Parametro | Descrizione |
|---|---|
| `client_id` | Client ID dell'app Spotify |
| `device_name` | Nome del dispositivo Spotify di destinazione |
| `show_devices` | (opzionale) `true` per elencare i dispositivi disponibili |

---
localhost:5500/index.html/client_id=85b5d4a5b0fe48eea33cc5f70687a576&show_devices=true
*Author: Giovanni Romeo*
