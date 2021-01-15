import { Pause } from "../Pause";
import { Scores } from "../Scores";

export const Dashboard = document.createElement('div');
Dashboard.style.display = 'flex';
Dashboard.style.width = '100%';
Dashboard.style.position = 'absolute';
Dashboard.style.top = 0;
Dashboard.style.left = 0;
Dashboard.style.justifyContent = 'space-between';
Dashboard.style.padding = '10px';

Dashboard.appendChild(Scores);
Dashboard.appendChild(Pause);
