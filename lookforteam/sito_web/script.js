$(document).ready(function() {
    //mi passo le variabili dei json su costanti locali//
    const teamsData = squadre;
    const playersData = giocatori;
    const career = carriera;

    // Funzione per popolare la select delle squadre
    function populateTeams() {
        const teamSelect = $('#teamSelect');
        //pulisco la select delle squadre e inserisco un opzione "dummy"//
        teamSelect.empty().append('<option value="">-- Seleziona una squadra --</option>'); 
        //carico la select con le varie squadre
        for (let i = 0; i < teamsData.length; i++) {
            teamSelect.append(`<option value="${teamsData[i].id}">${teamsData[i].squadra}</option>`);
        }
    }

    // Funzione di caricamento dei giocatori per squadra e anno selezionati
    $('#yearSelect').on("change", function() {
        alert("diomerda");
        const selectedTeamId = $('#teamSelect').val();
        const playerSelect = $('#playerSelect');
        const selectedYear = $('#yearSelect').val();

        playerSelect.empty().append('<option value="">-- Seleziona un giocatore --</option>');

        for (let i = 0; i < career.length; i++) {

            if (career[i].idsquadra == selectedTeamId && career[i].annocarriera == selectedYear) {

                for (let j = 0; j < playersData.length; j++) {

                    if (playersData[j].id === career[i].idgiocatore) {
                        
                        playerSelect.append(`<option value="${playersData[j].id}">${playersData[j].nome}, ${playersData[j].eta}</option>`);
                    }
                }
            }
        }
    });

    // Al cambio di giocatore, mostra la sua carriera
    $('#playerSelect').change(function() {
        const selectedPlayerId = $(this).val();
        const careerList = $('#careerList');
        careerList.empty(); // Reset lista carriera

        if (selectedPlayerId) {
            const selectedPlayer = playersData.find(player => player.id == selectedPlayerId);
            if (selectedPlayer && selectedPlayer.career) {
                selectedPlayer.career.forEach(function(club) {
                    careerList.append(`<li>${club}</li>`);
                });
            }
        }
    });

    // Popoliamo la combobox delle squadre all'avvio
    populateTeams();
});
