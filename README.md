# CineBox

CineBox è un'applicazione full-stack per la gestione di contenuti cinematografici, composta da un backend Laravel e un frontend Next.js.

## Architettura

Il progetto utilizza Docker Compose per gestire tutti i servizi necessari:

- **Backend Laravel** (server): API REST per la gestione dei dati
- **Frontend Next.js** (web): Interfaccia utente reattiva
- **Database MySQL**: Persistenza dei dati
- **Redis**: Caching e sessioni
- **Reverb**: WebSocket per funzionalità in tempo reale

## Requisiti

- Docker e Docker Compose installati
- Almeno 2GB di RAM disponibili

## Come avviare il progetto

1. **Clona il repository** (se non l'hai già fatto):

   ```bash
   git clone <repository-url>
   cd CineBox
   ```

2. **Avvia tutti i servizi con Docker Compose**:

   ```bash
   docker compose up -d
   ```

3. **Attendi il completamento del build** (la prima volta può richiedere alcuni minuti).

4. **Verifica che i servizi siano attivi**:

   ```bash
   docker compose ps
   ```

5. **Accedi alle applicazioni**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:3308 (utente: cinebox_user, password: cinebox_pass)
   - Redis: localhost:6380

## Struttura del progetto

```
CineBox/
├── docker-compose.yml    # Configurazione Docker Compose
├── server/              # Backend Laravel
│   ├── app/            # Logica applicativa
│   ├── database/       # Migrazioni e seeders
│   ├── routes/         # Rotte API
│   ├── resources/      # Viste e assets
│   └── Dockerfile      # Configurazione container Laravel
├── web/                # Frontend Next.js
│   ├── app/           # Componenti React
│   ├── public/        # Assets statici
│   ├── package.json   # Dipendenze Node.js
│   ├── next.config.ts # Configurazione Next.js
|   └── Dockerfile      # Configurazione container Next.js
└── README.md          # Questo file
```

## Comandi utili

- **Avvia i servizi**:

  ```bash
  docker compose up -d
  ```

- **Ferma i servizi**:

  ```bash
  docker compose down
  ```

- **Visualizza i log**:

  ```bash
  docker compose logs -f [servizio]
  ```

- **Entra nel container del server**:

  ```bash
  docker compose exec server bash
  ```

- **Entra nel container del frontend**:
  ```bash
  docker compose exec web bash
  ```

## Configurazione iniziale

Dopo il primo avvio, potrebbe essere necessario eseguire alcuni comandi di inizializzazione:

1. **Installa le dipendenze PHP nel container del server**:

   ```bash
   docker compose exec server composer install
   ```

2. **Genera la chiave dell'applicazione Laravel**:

   ```bash
   docker compose exec server php artisan key:generate
   ```

3. **Esegui le migrazioni del database**:

   ```bash
   docker compose exec server php artisan migrate
   ```

4. **Installa le dipendenze Node.js nel container del frontend**:

   ```bash
   docker compose exec web npm install
   ```

4. **Comando se ho errore di permessi in php**:
   ```bash
      #!/bin/bash
   cd /opt/stacks/cinebox/server
   sudo chown -R lorenzo:lorenzo .
   sudo chmod -R 775 storage bootstrap/cache
   sudo chmod 644 .env
   echo "Permessi sistemati, apri VS Code ora."
   ```

## Troubleshooting

- **Se i servizi non partono**: controlla che Docker sia in esecuzione
- **Se ci sono errori di permessi**: assicurati che l'utente abbia i permessi necessari
- **Se il frontend non si connette al backend**: verifica le variabili d'ambiente in `web/.env`

## Contatti

Per supporto o domande, contatta l'amministratore del progetto.
