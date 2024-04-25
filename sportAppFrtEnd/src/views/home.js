import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllNews, getNewsForSport } from "../data/news.js";

const homeTemplate = (news) => html`
      
       ${news.length > 0 ? news.map(newsCard) : html`There arent any news!`}
    
        <aside class="standing-section">
          <h2>League Standings</h2>
          <select id="leagueSelect">
            <option value="france">France</option>
            <option value="bulgaria">Bulgaria</option>
            <option value="england">England</option>
            <option value="spain">Spain</option>
            <option value="germany">Germany</option>
          </select>
          <table id="standingTable">
            <thead>
              <tr>
                <th>POS</th>
                <th>CLUB</th>
                <th>PTS</th>
                <th>MP</th>
              </tr>
            </thead>
            <tbody>
        
            </tbody>
          </table>
        </aside>
     
    `;



    const newsCard = (news) => html`
    <div class="news-section">
    <article class="big-news">
      <h2>${news.title}</h2>
      <p>${news.matchDescrp}</p>
    </article>
  </div>
    `


export async function homePage(ctx) {
  const news = await getAllNews();
    ctx.render(homeTemplate(news));
}

const dataForTable = () => html`
<td>1</td>
<td>Balkan</td>
<td>45</td>
<td>20</td>
`

// document.addEventListener('DOMContentLoaded', function() {
//     const leagueSelect = document.getElementById('leagueSelect');
//     const standingTable = document.getElementById('standingTable').getElementsByTagName('tbody')[0];
  
//     leagueSelect.addEventListener('change', function() {
//       const selectedLeague = leagueSelect.value;
  
//       // You can fetch the league standings data from a server based on the selected league
//       // For demonstration purposes, I'll just use dummy data here
//       const dummyData = {
//         france: [
//           { position: 1, clubName: 'Club A', points: 30, matchesPlayed: 15 },
//           { position: 2, clubName: 'Club B', points: 28, matchesPlayed: 15 },
//           // Add more data for other clubs
//         ],
//         bulgaria: [
//           { position: 1, clubName: 'Club X', points: 25, matchesPlayed: 12 },
//           { position: 2, clubName: 'Club Y', points: 22, matchesPlayed: 12 },
//           // Add more data for other clubs
//         ],
//         // Add data for other leagues
//       };
  
//       // Clear the existing table rows
//       standingTable.innerHTML = '';
  
//       // Populate the table with data for the selected league
//       dummyData[selectedLeague].forEach(function(team) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td>${team.position}</td>
//           <td>${team.clubName}</td>
//           <td>${team.points}</td>
//           <td>${team.matchesPlayed}</td>
//         `;
//         standingTable.appendChild(row);
//       });
//     });
  
//     // Trigger change event to populate the table initially
//     leagueSelect.dispatchEvent(new Event('change'));
//   });