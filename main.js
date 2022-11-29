const token = "1f03d446703e470ba3bc872d47f6787c";
let baseUrl = "https://api.football-data.org/v4";
const backupUrlStandings = "./standings.json"
const backupUrlMatches = "./matches.json"


  function getStanding(){
    const url = `${baseUrl}/competitions/2000/standings`

    axios.get(backupUrlStandings, {
        headers: {
            "X-Auth-Token": token
        }
    })
    .then((response) => {
        const standings = response.data.standings;

        document.getElementById('standings').innerHTML = "";

        for(standing of standings){

            let tableContent = '';
            for(row of standing.table){
                tableContent += `
                    <li class="list-group-item">

                    <div class="add-info-col">
                        <div class="team"><p>Team</p></div>
                        <div class="badge text-bg-success"><p>w</p></div>
                        <div class="badge text-bg-danger"><p>L</p></div>
                        <div class="badge text-bg-secondary"><p>D</p></div>
                        <div class="badge text-bg-info"><p>Pts</p></div>
                    </div>

                    <div class="row width-50">
                    <div class="col-sm-4 align-center d-flex justify-content-center align-items-center">
                        <span class="flag"><img class= "border border-2" src="${row.team.crest}" alt="ksa"></span>
                        <h6 class="team-name"><b>${row.team.tla}</b></h6>
                    </div>

                    <div class="col-sm-2 d-flex justify-content-center align-items-center flex-column"><p class="text-success">${row.won}</p></div>
                    <div class="col-sm-2 d-flex justify-content-center align-items-center flex-column"><p class="text-danger">${row.lost}</p></div>
                    <div class="col-sm-2 d-flex justify-content-center align-items-center flex-column"><p class="text-secondary">${row.draw}</p></div>
                    <div class="col-sm-2 d-flex justify-content-center align-items-center flex-column"><p class="text-info">${row.points}</p></div>
                    </div>
                </li>
                `
            }

            const content = `
                <div class="col-sm-6 mb-4">
                <div class="card shadow">
                <div class="card-header bg-main align-center">
                    <b>${standing.group}</b>
                </div>
                
                <div class="row bg-second m-0 display-none">
                    <div class="col-sm-4 align-center">Team</div>
                    <div class="col-sm-2 align-center">W</div>
                    <div class="col-sm-2 align-center">L</div>
                    <div class="col-sm-2 align-center">D</div>
                    <div class="col-sm-2 align-center">Pts</div>
                </div>

                <ul class="list-group list-group-flush">

                ${tableContent}
                    
                </ul>

                </div>
            </div>
            `
            document.getElementById('standings').innerHTML += content

        }
    })
}



function getMatches(){
    const url = `${baseUrl}/competitions/2000/matches`

    axios.get(backupUrlMatches, {
        headers: {
            "X-Auth-Token": token
        }
    })
    .then((response) => {
        const matches = response.data.matches;

        document.getElementById('matches').innerHTML = "";

        // start arrangement matches
            const select_value = document.getElementById("arrangement");
            let select_value_string = "tow";

            function filter(filter_value){
               const matches_filter = matches.filter((match) => {
                        const utcDate = match.utcDate;
                        const matchTime = new Date(utcDate);
                        const day = matchTime.getUTCDate();

                        switch(filter_value){
                            case "one":
                                return day <= 24 && day >= 20;
                            case "tow":
                                return day <= 28 && day >= 25;
                            case "three":
                                return day <= 30 && day >= 29 || day <= 2 && day >= 1 ;
                        }
                        
                        });
                        show_matches(matches_filter);
                        return matches_filter;
            }

            filter(select_value_string);

            select_value.addEventListener("change", (e) => {
                        console.log();
                        show_matches(filter(e.target.value));

            });

        
        // end arrangement matches
        

    function show_matches(matches){
        document.getElementById("matches").innerHTML = '';
        for(match of matches){

            const utcDate = match.utcDate;
            const matchTime = new Date(utcDate);
            const dateString = `${matchTime.getUTCFullYear()} / ${matchTime.getUTCMonth()+1} / ${matchTime.getUTCDate()}`;
            const timerStrimg = `  ${matchTime.getUTCHours()}:${matchTime.getUTCMinutes()}0 `
            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;
            const score = match.score;

            //start win toogle

            let win_stamp = `<span class="badge text-bg-success">Win!</span>`;

            // switch(match.score.winner){
            //     case "HOME_TEAM":
            //         win_stamp = `<span class="badge text-bg-success">Win!</span>`
            //         break;
            //     case "AWAY_TEAM":
            //         win_stamp = `<span class="badge text-bg-success">Win!</span>`
            //         break;
            //     default:
            //         win_stamp = ``
            // }


            
            // const home_win_team_name = is_win ? `<b class = "win">${homeTeam.tla}</b>` : `<b>${homeTeam.tla}</b>`;
            // const home_win_team_num = is_win ? `<h3 class = "win">${score.fullTime.home ?? `-`}</h3>` : ` <h3>${score.fullTime.home ?? `-`}</h3>`
            // const away_win_team_name = is_win ? `<b class = "win">${awayTeam.tla}</b>` : `<b>${awayTeam.tla}</b>`;
            // const away_win_team_num = is_win ? `<h3 class = "win">${score.fullTime.away ?? `-`}</h3>` : ` <h3>${score.fullTime.away ?? `-`}</h3>`;

            // end win toogle


            // if(homeTeam.id === null) {
            //     continue;
            // }

            console.log(match.status);

            const content = `
                ${match.status === "IN_PLAY" ? `<span class="badge text-bg-warning w-25 my-0 mx-auto">Play Now!</span>` : ''}
                ${match.status === "PAUSED" ? `<span class="badge text-bg-warning w-25 my-0 mx-auto">Paused!</span>` : ''}
                ${match.status === "TIMED" ? `<span class="badge text-bg-info w-25 my-0 mx-auto">Not Yet!</span>` : ''}
                ${match.status === "FINISHED" ? `<span class="badge text-bg-danger w-25 my-0 mx-auto">Finished!</span>` : ''}

                <div class="col-sm-12 mb-5">
                <div class="card shadow rounded-pill overflow-hidden">
                <div class="card-body p-0">
                    <div class="row">

                    <!-- First Team Col -->
                    <div class="col-sm-3 bg-main d-flex flex-column justify-content-center align-items-center border-right p-4">
                        <div class="flag"><img src="${homeTeam.crest}" alt="ksa"></div>
                        <h6 class="team-name"><b>${homeTeam.tla}</b></h6>
                        ${score.winner === "HOME_TEAM" && match.status === "FINISHED" ? win_stamp : ''}
                    </div>

                    <!--// First Team Col //-->

                    <!-- Match Info Col -->

                        <div class="col-sm-6 align-center">
                        <div class="row"> 
                        <div class="col-sm-4 margin-auto-0">
                            
                            <h3>${score.fullTime.home ?? `-`}</h3>
                        
                        </div>

                        <div class="col-sm-4 margin-auto-0">
                            <h6>${match.group}</h6>
                            <h1>X</h1>
                            <h6>${dateString} <h6>${timerStrimg}</h6> </h6>
                        </div>

                        <div class="col-sm-4 margin-auto-0">
                            
                            <h3>${score.fullTime.away ?? `-`}</h3>
                            
                        </div>

                        </div>
                        </div>

                    <!--// Match Info Col //-->

                        <!-- Second Team Col -->
                        <div class="col-sm-3 bg-main d-flex flex-column justify-content-center align-items-center border-left p-4">
                            <div class="flag"><img src="${awayTeam.crest}" alt="ksa"></div>
                            <h6 class="team-name"><b>${awayTeam.tla}</b></h6>
                            ${score.winner === "AWAY_TEAM" && match.status === "FINISHED" ? win_stamp : ''}
                        </div>
        
                        <!--// Second Team Col //-->

                    </div>
                </div>
                </div>
            </div>
            `

            document.getElementById("matches").innerHTML += content;

        }
    }

        
        
    })
}

getStanding();
getMatches();
