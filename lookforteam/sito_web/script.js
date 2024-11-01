$(document).ready(function() {
    const teamsData = squadre;
    const playersData = giocatori;
    const careerData = carriera;

    function populateTeams() {
        const teamSelect = $('#teamSelect');
        teamSelect.empty().append('<option value="">-- Seleziona una squadra --</option>'); 
        teamsData.forEach(team => {
            teamSelect.append(`<option value="${team.id}">${team.squadra}</option>`);
        });
    }

    $('#yearSelect').on("change", function() {
        const selectedTeamId = $('#teamSelect').val();
        const playerSelect = $('#playerSelect');
        const selectedYear = $(this).val();

        playerSelect.empty().append('<option value="">-- Seleziona un giocatore --</option>');

        if (selectedTeamId && selectedYear) {
            careerData.forEach(career => {
                if (career.idsquadra === selectedTeamId && career.annocarriera === selectedYear) {
                    const player = playersData.find(p => p.id === career.idgiocatore);
                    if (player) {
                        playerSelect.append(`<option value="${player.id}">${player.nome}, ${player.eta}</option>`);
                    }
                }
            });
            playerSelect.prop('disabled', false); // Enable player select
        } else {
            playerSelect.prop('disabled', true); // Disable player select if no team/year selected
        }
    });

    $('#playerSelect').change(function() {
        const selectedPlayerId = $(this).val();
        const careerList = $('#careerList');
        careerList.empty(); // Reset list

        if (selectedPlayerId) {
            const playerCareer = careerData.filter(c => c.idgiocatore === selectedPlayerId);
            playerCareer.forEach(club => {
                const team = teamsData.find(t => t.id === club.idsquadra);
                if (team) {
                    careerList.append(`<li>${team.squadra} (${club.annocarriera})</li>`);
                }
            });
        }
    });

    populateTeams();
});