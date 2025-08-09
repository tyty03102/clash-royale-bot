import fetch from "node-fetch";

// Replace with your own API token from https://developer.clashroyale.com
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI3OWJjOWI5LThlY2ItNDllMi05Mzc0LWVlZDZmZDAyMTZkYiIsImlhdCI6MTc1NDc2MTg0Mywic3ViIjoiZGV2ZWxvcGVyLzcyODNmNTY0LTViZWMtNTQzMC04MzE5LTE5NWFmN2JmNTViYiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiLCI3MS4yMjMuMTIxLjQxIl0sInR5cGUiOiJjbGllbnQifV19.L-rfGSTcDEoXLO36JYSEUX4xG2W_T5H38vztgI8pqmb3lR4JjD6JGS6APHDnFOqWBDk6GTbzlxZynqbXL57Rfg";
// Replace with your player tag (remove the # in front)
const PLAYER_TAG = "VOVCP2909"; 

async function getPlayerData() {
  const url = `https://api.clashroyale.com/v1/players/%23${PLAYER_TAG}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error("Error:", response.status, await response.text());
    return;
  }

  const data = await response.json();
  console.log(data);
}

getPlayerData();
