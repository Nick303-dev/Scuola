public class Abbigliamento extends Merce
{
    boolean isUomo;

    public Abbigliamento(float prezzo, String descrizione, int codice,boolean isUomo) {
        super(prezzo, descrizione, codice);
        this.isUomo=isUomo;
    }

    public void calcolaPrezzo()
    {
        if(!isUomo){
            prezzo=prezzo * ((float) 40 /100);
        }
        else{
            prezzo=prezzo * ((float)20/100);
    }
    }
}
