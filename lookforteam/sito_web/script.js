$(document).ready(function() {
    // Assumi che squadre e giocatori siano già oggetti JavaScript
    const teamsData = squadre;
    const playersData = giocatori;
    const career = carriera;


    // Funzione per popolare la combobox delle squadre
    function populateTeams() {
        const teamSelect = $('#teamSelect');
        teamSelect.empty().append('<option value="">-- Seleziona una squadra --</option>'); // Reset combobox squadre
        for (let i = 0; i < teamsData.length; i++) {
            teamSelect.append(`<option value="${teamsData[i].id}">${teamsData[i].squadra}</option>`);
        }
    }
    // Al cambio di squadra, aggiorna la lista dei giocatori
    $('#yearselect').change(function() {
        const selectedTeamId = $('#teamSelect').val();
        const playerSelect=$('#playerselect');
        const yearselect =$('#yearselect');
        const selectedyear = $(yearselect).val();
        for(let i=0;i<career.length;i++){
        if(career[i].id-squadra == selectedTeamId){
            if(selectedyear == career[i].anno-carriera){
                playerSelect.empty();
                for(let j=0;j<playersData.length;j++){
                    playerSelect.append('<option value="${playerData[i].id}">${teamsData[i].nome},${teamsData[i].eta}</option>');
                }
            }
            
        }
            
        }
    });

    // Al cambio di giocatore, mostra la sua carriera
    $('#playerSelect').change(function() {
        const selectedPlayerName = $(this).val();
        const careerList = $('#careerList');
        careerList.empty(); // Reset lista carriera

        if (selectedPlayerName) {
            const selectedPlayer = playersData.find(player => player.nome === selectedPlayerName);
            // Popola la carriera del giocatore
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
