#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char nome[20];
    char cognome[20];
    char matricola[6];   // Considero matricola come stringa per semplicità
    char telefono[10];   // Considero telefono come stringa per evitare overflow
    char sesso;          // 'M' o 'F'
} Dipendente;

void inserisciDipendenti(FILE *file, int n) {
    Dipendente d;
    for (int i = 0; i < n; i++) {
        printf("Inserisci i dati per il dipendente %d:\n", i + 1);
        printf("Matricola: ");
        scanf("%s", d.matricola);
        printf("Nome: ");
        scanf("%s", d.nome);
        printf("Cognome: ");
        scanf("%s", d.cognome);
        printf("Telefono: ");
        scanf("%s", d.telefono);
        printf("Sesso (M/F): ");
        scanf(" %c", &d.sesso);  // Spazio prima di %c per ignorare il newline

        // Scrive il dipendente nel file
        fwrite(&d, sizeof(Dipendente), 1, file);
    }
}

void caricaDipendentiInArray(FILE *file, Dipendente dipendenti[], int n) {
    rewind(file);  // Riavvolge il file per leggerlo dall'inizio
    for (int i = 0; i < n; i++) {
        fread(&dipendenti[i], sizeof(Dipendente), 1, file);
    }
}

void scriviFilePerGenere(Dipendente dipendenti[], int n) {
    FILE *fileMaschi = fopen("maschi.txt", "w");
    FILE *fileFemmine = fopen("femmine.txt", "w");

    if (fileMaschi == NULL || fileFemmine == NULL) {
        printf("Errore nell'apertura dei file per maschi o femmine.\n");
        return;
    }

    for (int i = 0; i < n; i++) {
        if (dipendenti[i].sesso == 'M' || dipendenti[i].sesso == 'm') {
            fwrite(&dipendenti[i], sizeof(Dipendente), 1, fileMaschi);
        } else if (dipendenti[i].sesso == 'F' || dipendenti[i].sesso == 'f') {
            fwrite(&dipendenti[i], sizeof(Dipendente), 1, fileFemmine);
        }
    }

    fclose(fileMaschi);
    fclose(fileFemmine);
}

int main() {
    FILE *file = fopen("dipendenti.txt", "w+");
    if (file == NULL) {
        printf("Errore nell'apertura del file dipendenti.txt.\n");
        return 1;
    }

    int n;
    printf("Quanti dipendenti vuoi inserire? ");
    scanf("%d", &n);

    // Inserimento dei dipendenti nel file
    inserisciDipendenti(file, n);

    // Carica dipendenti in un array
    Dipendente dipendenti[n];
    caricaDipendentiInArray(file, dipendenti, n);

    // Scrive i file per maschi e femmine
    scriviFilePerGenere(dipendenti, n);

    fclose(file);

    printf("Dati dei dipendenti salvati e divisi per genere nei file 'maschi.txt' e 'femmine.txt'.\n");

    return 0;
}
