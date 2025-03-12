public abstract class Merce
{
    float prezzo;
    int codice;
    String descrizione;

    public Merce(float prezzo, String descrizione, int codice) {
        this.prezzo = prezzo;
        this.descrizione = descrizione;
        this.codice = codice;
    }

    protected abstract void calcolaPrezzo();
}
