📽️ CineBox: Definitive Tech Stack & Architecture
1. Backend (Il Motore - Laravel 12)
    • Framework: Laravel 12.
    • Database: MySQL 8. Gestione dati per utenti, preferiti, progresso video, storico chat e rating.
    • Caching: Redis. Per salvare le risposte di TMDB, gestire il debouncing della ricerca e velocizzare il recupero delle medie dei voti.
    • Autenticazione: Laravel Sanctum. Protezione delle API tramite Bearer Tokens.
    • Real-Time (WebSockets): Laravel Reverb. Gestione istantanea di chat e notifiche.
    • Validazione: Laravel Form Requests. Validazione lato server (es. un utente può votare un film una sola volta).
    • Integrazione API: Laravel HTTP Client per consumare i dati di TMDB (Film, Cast, Trailer).
    • Organizzazione Dati: Spatie Laravel-Data. Per creare DTO puliti che uniscono i dati TMDB ai dati del tuo database (es. aggiungere my_rating all'oggetto Film).
    • Background Processing: Laravel Queues + Redis. Per gestire compiti asincroni come l'invio di notifiche e il ricalcolo delle classifiche.
2. Frontend (L'Interfaccia - Next.js 16)
    • Framework: Next.js 16 (App Router) con React Compiler abilitato per la memorizzazione automatica dei componenti.
    • Linguaggio: TypeScript. Tipizzazione rigorosa per eliminare errori di comunicazione con le API.
    • Styling: Tailwind CSS.
    • Componenti UI: shadcn/ui. Per Slider, Modal, Skeleton Screens e il sistema di Rating a stelle.
    • Validazione Form: React Hook Form + Zod. Controllo immediato di email, password e commenti.
    • Animazioni: Framer Motion. Per l'effetto zoom sui poster e la comparsa fluida dei messaggi in chat.
    • Video Player: ReactPlayer. Per il playback dei trailer di YouTube.
3. Comunicazione e Stato (Il "Collante")
    • Data Fetching: TanStack Query (React Query) + Axios. Gestione intelligente della cache client-side e degli "Optimistic Updates".
    • Real-Time Client: Laravel Echo + Pusher-JS. Per connettere Next.js al server Reverb.
    • State Management: Zustand. Per gestire l'utente, il profilo attivo e lo stato della chat globale.
    • Sincronizzazione TS: Spatie Laravel TypeScript Transformer. Generazione automatica dei tipi TS dai modelli Laravel.

🛠️ Funzionalità Avanzate Implementate
    1. Validazione Dual-Layer: Protezione totale. Zod ferma gli errori nel browser, Laravel garantisce l'integrità nel database.
    2. Sistema di Rating della Community: * Votazione da 1 a 5 stelle salvata su MySQL.
        ◦ Calcolo della media dei voti lato backend.
        ◦ Possibilità di aggiornare il proprio voto (logica upsert).
    3. "Continua a guardare": Sincronizzazione automatica del minutaggio video ogni 30s.
    4. Ricerca Intelligente: Debouncing (500ms) e caching su Redis per risultati istantanei.
    5. Chat Real-Time: * Invio via Axios, salvataggio su DB, Broadcast via Reverb.
        ◦ Ricezione via Echo per aggiornamento UI senza refresh.
    6. Hover Preview: Zoom del poster con Framer Motion e avvio del trailer TMDB via ReactPlayer.
    7. Optimistic UI (Preferiti & Rating): L'interfaccia reagisce istantaneamente al click dell'utente (cuore o stella) mentre la richiesta viaggia verso il server.
    8. Event-Driven Architecture: Utilizzo di Laravel Events & Listeners per mantenere il codice del backend disaccoppiato e scalabile.

4. Autenticazione Avanzata
    • Social Login: Laravel Socialite. Integrazione con Google e GitHub per un accesso rapido senza password.
    • Session Management: Integrazione tra i token di Socialite e Laravel Sanctum per mantenere la sessione sicura su Next.js.
5. User Experience (UX)
    • Theming: next-themes. Supporto completo a Dark, Light e System preference con variabili CSS di Tailwind.
    • Accessibility: Componenti shadcn conformi agli standard WCAG (essenziale per un progetto pro).
6. Security & Data Integrity
    • API Security (Laravel Policies): Utilizzo delle Policies di Laravel per garantire che solo il proprietario di un commento o di un voto possa modificarlo (es. can('update', $rating)).
    • XSS & CSRF Protection: Protezione nativa tramite Sanctum e sanitizzazione degli input nella Chat per prevenire attacchi di script injection.
    • Rate Limiting: Implementazione di limiti sulle API (es. massimo 60 richieste al minuto per la ricerca) per prevenire abusi e attacchi brute-force.


-----------------------------------------------------------------------------------------------------

Piano Cline

# Piano di Implementazione CineBox - Approccio Graduale

## Fase 1: Configurazione Base e Database (Oggi)
- [X] Avviare i container Docker con `docker-compose up -d`
- [X] Copiare .env.example in .env e configurare MySQL
- [X] Installare le dipendenze PHP e Node.js
- [X] Eseguire le migrazioni del database
- [X] Testare la connessione tra i servizi

## Fase 2: Backend Laravel Core (Giorno 2)
- [X] Creare i Model per Film, User, Rating, Comment, WatchHistory
- [X] Implementare le API per TMDB (Film, Cast, Trailer)
- [+-] Creare i Controller per le operazioni CRUD
- [X] Configurare Spatie Laravel-Data per i DTO
- [ ] Implementare la validazione con Form Requests
- [ ] Configurare Laravel Sanctum per l'autenticazione

## Fase 3: Frontend Next.js Base (Giorno 3)
- [ ] Configurare Tailwind CSS e shadcn/ui
- [ ] Creare i componenti base (FilmCard, SearchBar, Modal)
- [ ] Implementare il layout principale
- [ ] Configurare TanStack Query per il data fetching
- [ ] Creare le pagine principali (Home, FilmDetail, Search)

## Fase 4: Funzionalità Principali (Giorno 4-5)
- [ ] Implementare il sistema di rating (1-5 stelle)
- [ ] Creare il sistema di preferiti
- [ ] Implementare "Continua a guardare" con sincronizzazione video
- [ ] Aggiungere il player per i trailer con ReactPlayer
- [ ] Implementare la ricerca intelligente con debouncing

## Fase 5: Autenticazione e Social Login (Giorno 6)
- [ ] Configurare Laravel Socialite (Google, GitHub)
- [ ] Implementare il login/logout in Next.js
- [ ] Creare le policy per la protezione delle risorse
- [ ] Configurare le sessioni sicure

## Fase 6: Chat Real-Time (Giorno 7)
- [ ] Configurare Laravel Reverb e Echo
- [ ] Implementare il sistema di messaggistica
- [ ] Creare la UI per la chat
- [ ] Aggiungere notifiche in tempo reale

## Fase 7: Ottimizzazioni e Dettagli (Giorno 8)
- [ ] Implementare il dark mode con next-themes
- [ ] Aggiungere animazioni con Framer Motion
- [ ] Configurare il caching su Redis
- [ ] Ottimizzare le performance
- [ ] Aggiungere accessibilità WCAG

## Fase 8: Test e Deploy (Giorno 9)
- [ ] Testare tutte le funzionalità
- [ ] Configurare il rate limiting
- [ ] Ottimizzare per produzione
- [ ] Documentazione finale

## Struttura Progetto Finale:
```
cinebox/
├── server/           # Laravel 12
├── web/             # Next.js 16
├── docker-compose.yml
└── README.md