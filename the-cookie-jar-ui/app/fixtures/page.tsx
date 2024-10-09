"use client";
import React, { useState, useMemo, useCallback } from "react";

export default function Fixtures() {
  const data = [
    {
      fixture_id: "34184872",
      league: "Champions League",
      team_home: "Milan",
      team_away: "Club Brugge",
      fixture_url:
        "https://m.skybet.com/football/champions-league/milan-v-club-brugge/34184872",
    },
    {
      fixture_id: "34184822",
      league: "Champions League",
      team_home: "Monaco",
      team_away: "Crvena zvezda",
      fixture_url:
        "https://m.skybet.com/football/champions-league/monaco-v-crvena-zvezda/34184822",
    },
    {
      fixture_id: "34184938",
      league: "Champions League",
      team_home: "Arsenal",
      team_away: "Shakhtar Donetsk",
      fixture_url:
        "https://m.skybet.com/football/champions-league/arsenal-v-shakhtar-donetsk/34184938",
    },
    {
      fixture_id: "34184846",
      league: "Champions League",
      team_home: "Aston Villa",
      team_away: "Bologna",
      fixture_url:
        "https://m.skybet.com/football/champions-league/aston-villa-v-bologna/34184846",
    },
    {
      fixture_id: "34184813",
      league: "Champions League",
      team_home: "Girona",
      team_away: "Slovan Bratislava",
      fixture_url:
        "https://m.skybet.com/football/champions-league/girona-v-slovan-bratislava/34184813",
    },
    {
      fixture_id: "34184918",
      league: "Champions League",
      team_home: "Juventus",
      team_away: "Stuttgart",
      fixture_url:
        "https://m.skybet.com/football/champions-league/juventus-v-stuttgart/34184918",
    },
    {
      fixture_id: "34184807",
      league: "Champions League",
      team_home: "Paris St Germain",
      team_away: "PSV Eindhoven",
      fixture_url:
        "https://m.skybet.com/football/champions-league/paris-st-germain-v-psv-eindhoven/34184807",
    },
    {
      fixture_id: "34184860",
      league: "Champions League",
      team_home: "Real Madrid",
      team_away: "Dortmund",
      fixture_url:
        "https://m.skybet.com/football/champions-league/real-madrid-v-dortmund/34184860",
    },
    {
      fixture_id: "34184915",
      league: "Champions League",
      team_home: "Sturm Graz",
      team_away: "Sporting CP",
      fixture_url:
        "https://m.skybet.com/football/champions-league/sturm-graz-v-sporting-cp/34184915",
    },
    {
      fixture_id: "34068839",
      league: "Premier League",
      team_home: "Arsenal",
      team_away: "Southampton",
      fixture_url:
        "https://m.skybet.com/football/premier-league/arsenal-v-southampton/34068839",
    },
    {
      fixture_id: "34068835",
      league: "Premier League",
      team_home: "Brentford",
      team_away: "Wolves",
      fixture_url:
        "https://m.skybet.com/football/premier-league/brentford-v-wolves/34068835",
    },
    {
      fixture_id: "34068852",
      league: "Premier League",
      team_home: "Leicester",
      team_away: "Bournemouth",
      fixture_url:
        "https://m.skybet.com/football/premier-league/leicester-v-bournemouth/34068852",
    },
    {
      fixture_id: "34068826",
      league: "Premier League",
      team_home: "Manchester City",
      team_away: "Fulham",
      fixture_url:
        "https://m.skybet.com/football/premier-league/manchester-city-v-fulham/34068826",
    },
    {
      fixture_id: "34068828",
      league: "Premier League",
      team_home: "West Ham",
      team_away: "Ipswich",
      fixture_url:
        "https://m.skybet.com/football/premier-league/west-ham-v-ipswich/34068828",
    },
    {
      fixture_id: "34069044",
      league: "Premier League",
      team_home: "Everton",
      team_away: "Newcastle",
      fixture_url:
        "https://m.skybet.com/football/premier-league/everton-v-newcastle/34069044",
    },
    {
      fixture_id: "34068842",
      league: "Sky Bet League One",
      team_home: "Bolton",
      team_away: "Shrewsbury",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/bolton-v-shrewsbury/34068842",
    },
    {
      fixture_id: "34068808",
      league: "Sky Bet League One",
      team_home: "Burton",
      team_away: "Bristol Rovers",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/burton-v-bristol-rovers/34068808",
    },
    {
      fixture_id: "34068815",
      league: "Sky Bet League One",
      team_home: "Charlton",
      team_away: "Birmingham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/charlton-v-birmingham/34068815",
    },
    {
      fixture_id: "34068816",
      league: "Sky Bet League One",
      team_home: "Exeter",
      team_away: "Cambridge",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/exeter-v-cambridge/34068816",
    },
    {
      fixture_id: "34068813",
      league: "Sky Bet League One",
      team_home: "Lincoln",
      team_away: "Leyton Orient",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/lincoln-v-leyton-orient/34068813",
    },
    {
      fixture_id: "34068855",
      league: "Sky Bet League One",
      team_home: "Mansfield",
      team_away: "Blackpool",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/mansfield-v-blackpool/34068855",
    },
    {
      fixture_id: "34068804",
      league: "Sky Bet League One",
      team_home: "Rotherham",
      team_away: "Reading",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/rotherham-v-reading/34068804",
    },
    {
      fixture_id: "34068825",
      league: "Sky Bet League One",
      team_home: "Stockport County",
      team_away: "Wigan",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/stockport-county-v-wigan/34068825",
    },
    {
      fixture_id: "34068798",
      league: "Sky Bet League One",
      team_home: "Wrexham",
      team_away: "Northampton",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/wrexham-v-northampton/34068798",
    },
    {
      fixture_id: "34068844",
      league: "Sky Bet League Two",
      team_home: "Accrington",
      team_away: "Morecambe",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/accrington-v-morecambe/34068844",
    },
    {
      fixture_id: "34068851",
      league: "Sky Bet League Two",
      team_home: "Barrow",
      team_away: "Cheltenham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/barrow-v-cheltenham/34068851",
    },
    {
      fixture_id: "34068805",
      league: "Sky Bet League Two",
      team_home: "Chesterfield",
      team_away: "Walsall",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/chesterfield-v-walsall/34068805",
    },
    {
      fixture_id: "34068790",
      league: "Sky Bet League Two",
      team_home: "Colchester",
      team_away: "Carlisle",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/colchester-v-carlisle/34068790",
    },
    {
      fixture_id: "34068853",
      league: "Sky Bet League Two",
      team_home: "Crewe",
      team_away: "Gillingham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/crewe-v-gillingham/34068853",
    },
    {
      fixture_id: "34068827",
      league: "Sky Bet League Two",
      team_home: "MK Dons",
      team_away: "Tranmere",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/mk-dons-v-tranmere/34068827",
    },
    {
      fixture_id: "34068795",
      league: "Sky Bet League Two",
      team_home: "Notts County",
      team_away: "Port Vale",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/notts-county-v-port-vale/34068795",
    },
    {
      fixture_id: "34068810",
      league: "Sky Bet League Two",
      team_home: "Salford",
      team_away: "AFC Wimbledon",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/salford-v-afc-wimbledon/34068810",
    },
    {
      fixture_id: "34068822",
      league: "Sky Bet League Two",
      team_home: "Swindon",
      team_away: "Harrogate",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/swindon-v-harrogate/34068822",
    },
    {
      fixture_id: "34303160",
      league: "English National League",
      team_home: "AFC Fylde",
      team_away: "Aldershot",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/afc-fylde-v-aldershot/34303160",
    },
    {
      fixture_id: "34303148",
      league: "English National League",
      team_home: "Barnet",
      team_away: "Boston Utd",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/barnet-v-boston-utd/34303148",
    },
    {
      fixture_id: "34303147",
      league: "English National League",
      team_home: "Braintree",
      team_away: "Altrincham",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/braintree-v-altrincham/34303147",
    },
    {
      fixture_id: "34303145",
      league: "English National League",
      team_home: "Eastleigh",
      team_away: "Forest Green",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/eastleigh-v-forest-green/34303145",
    },
    {
      fixture_id: "34303146",
      league: "English National League",
      team_home: "Ebbsfleet United",
      team_away: "Rochdale",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/ebbsfleet-united-v-rochdale/34303146",
    },
    {
      fixture_id: "34303138",
      league: "English National League",
      team_home: "Gateshead",
      team_away: "Wealdstone",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/gateshead-v-wealdstone/34303138",
    },
    {
      fixture_id: "34303134",
      league: "English National League",
      team_home: "Halifax",
      team_away: "Tamworth",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/halifax-v-tamworth/34303134",
    },
    {
      fixture_id: "34303140",
      league: "English National League",
      team_home: "Hartlepool",
      team_away: "Sutton",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/hartlepool-v-sutton/34303140",
    },
    {
      fixture_id: "34303133",
      league: "English National League",
      team_home: "Oldham",
      team_away: "Solihull",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/oldham-v-solihull/34303133",
    },
    {
      fixture_id: "34068838",
      league: "Scottish Premiership",
      team_home: "Dundee",
      team_away: "Kilmarnock",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/dundee-v-kilmarnock/34068838",
    },
    {
      fixture_id: "34068807",
      league: "Scottish Premiership",
      team_home: "Hibernian",
      team_away: "Motherwell",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/hibernian-v-motherwell/34068807",
    },
    {
      fixture_id: "34068846",
      league: "Scottish Premiership",
      team_home: "St Mirren",
      team_away: "Dundee United",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/st-mirren-v-dundee-united/34068846",
    },
    {
      fixture_id: "34303259",
      league: "French Ligue 1",
      team_home: "St Etienne",
      team_away: "AJ Auxerre",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/st-etienne-v-aj-auxerre/34303259",
    },
    {
      fixture_id: "34303477",
      league: "French Ligue 1",
      team_home: "Lille",
      team_away: "Toulouse",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/lille-v-toulouse/34303477",
    },
    {
      fixture_id: "34303770",
      league: "French Ligue 1",
      team_home: "Rennes",
      team_away: "Monaco",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/rennes-v-monaco/34303770",
    },
    {
      fixture_id: "34142136",
      league: "German Bundesliga",
      team_home: "FC St. Pauli",
      team_away: "Mainz",
      fixture_url:
        "https://m.skybet.com/football/german-bundesliga/fc-st-pauli-v-mainz/34142136",
    },
    {
      fixture_id: "34303398",
      league: "Italian Serie A",
      team_home: "Atalanta",
      team_away: "Genoa",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-a/atalanta-v-genoa/34303398",
    },
    {
      fixture_id: "34303756",
      league: "Italian Serie A",
      team_home: "Inter",
      team_away: "Torino",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-a/inter-v-torino/34303756",
    },
    {
      fixture_id: "34147642",
      league: "Spanish La Liga",
      team_home: "Getafe",
      team_away: "Osasuna",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/getafe-v-osasuna/34147642",
    },
    {
      fixture_id: "34147634",
      league: "Spanish La Liga",
      team_home: "Las Palmas",
      team_away: "Celta Vigo",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/las-palmas-v-celta-vigo/34147634",
    },
    {
      fixture_id: "34147655",
      league: "Spanish La Liga",
      team_home: "Valladolid",
      team_away: "Rayo Vallecano",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/valladolid-v-rayo-vallecano/34147655",
    },
    {
      fixture_id: "34147653",
      league: "Spanish La Liga",
      team_home: "Real Madrid",
      team_away: "Villarreal",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/real-madrid-v-villarreal/34147653",
    },
    {
      fixture_id: "34344549",
      league: "Argentine Primera B Metropolitana",
      team_home: "Club Atlético Colegiales",
      team_away: "Deportivo Armenio",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-metropolitana/club-atletico-colegiales-v-deportivo-armenio/34344549",
    },
    {
      fixture_id: "34344554",
      league: "Argentine Primera B Metropolitana",
      team_home: "Club Sportivo Italiano",
      team_away: "Villa Dálmine",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-metropolitana/club-sportivo-italiano-v-villa-dalmine/34344554",
    },
    {
      fixture_id: "34344557",
      league: "Argentine Primera B Metropolitana",
      team_home: "San Martín Burzaco",
      team_away: "Fénix",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-metropolitana/san-martin-burzaco-v-fenix/34344557",
    },
    {
      fixture_id: "34344534",
      league: "Argentine Primera B Metropolitana",
      team_home: "UAI Urquiza",
      team_away: "Argentino de Quilmes",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-metropolitana/uai-urquiza-v-argentino-de-quilmes/34344534",
    },
    {
      fixture_id: "34349363",
      league: "Argentine Primera B Nacional",
      team_home: "Güemes",
      team_away: "Talleres de Remedios de Escalada",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/guemes-v-talleres-de-remedios-de-escalada/34349363",
    },
    {
      fixture_id: "34349424",
      league: "Argentine Primera B Nacional",
      team_home: "San Telmo",
      team_away: "Almirante Brown",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/san-telmo-v-almirante-brown/34349424",
    },
    {
      fixture_id: "34349427",
      league: "Argentine Primera B Nacional",
      team_home: "Almagro",
      team_away: "Aldosivi",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/almagro-v-aldosivi/34349427",
    },
    {
      fixture_id: "34349423",
      league: "Argentine Primera B Nacional",
      team_home: "Temperley",
      team_away: "Gimnasia Y Tiro",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/temperley-v-gimnasia-y-tiro/34349423",
    },
    {
      fixture_id: "34349535",
      league: "Argentine Primera B Nacional",
      team_home: "CA Agropecuario",
      team_away: "Guillermo Brown",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/ca-agropecuario-v-guillermo-brown/34349535",
    },
    {
      fixture_id: "34349684",
      league: "Argentine Primera B Nacional",
      team_home: "CA Chaco For Ever",
      team_away: "Colon de Santa Fe",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-b-nacional/ca-chaco-for-ever-v-colon-de-santa-fe/34349684",
    },
    {
      fixture_id: "34349367",
      league: "Argentine Primera Division",
      team_home: "Velez Sarsfield BA",
      team_away: "Racing Club",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-division/velez-sarsfield-ba-v-racing-club/34349367",
    },
    {
      fixture_id: "34349642",
      league: "Argentine Primera Division",
      team_home: "Gimnasia y Esgrima La Plata",
      team_away: "Godoy Cruz",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-division/gimnasia-y-esgrima-la-plata-v-godoy-cruz/34349642",
    },
    {
      fixture_id: "34349641",
      league: "Argentine Primera Division",
      team_home: "Newell's Old Boys",
      team_away: "Lanus",
      fixture_url:
        "https://m.skybet.com/football/argentine-primera-division/newells-old-boys-v-lanus/34349641",
    },
    {
      fixture_id: "34338230",
      league: "Austrian Bundesliga",
      team_home: "Austria Vienna",
      team_away: "Graz AK",
      fixture_url:
        "https://m.skybet.com/football/austrian-bundesliga/austria-vienna-v-graz-ak/34338230",
    },
    {
      fixture_id: "34338229",
      league: "Austrian Bundesliga",
      team_home: "RZ Pellets WAC",
      team_away: "TSV Hartberg",
      fixture_url:
        "https://m.skybet.com/football/austrian-bundesliga/rz-pellets-wac-v-tsv-hartberg/34338229",
    },
    {
      fixture_id: "34338231",
      league: "Austrian Bundesliga",
      team_home: "WSG Tirol",
      team_away: "Blau-Weiß Linz",
      fixture_url:
        "https://m.skybet.com/football/austrian-bundesliga/wsg-tirol-v-blau-wei-linz/34338231",
    },
    {
      fixture_id: "34343650",
      league: "Azerbaijani Premier League",
      team_home: "Sabah",
      team_away: "Araz Naxçıvan",
      fixture_url:
        "https://m.skybet.com/football/azerbaijani-premier-league/sabah-v-araz-naxcvan/34343650",
    },
    {
      fixture_id: "34348950",
      league: "Belgian First Division B",
      team_home: "SK Beveren",
      team_away: "Lokeren-Temse",
      fixture_url:
        "https://m.skybet.com/football/belgian-first-division-b/sk-beveren-v-lokeren-temse/34348950",
    },
    {
      fixture_id: "34349362",
      league: "Belgian First Division B",
      team_home: "RFC Seraing",
      team_away: "KAS Eupen",
      fixture_url:
        "https://m.skybet.com/football/belgian-first-division-b/rfc-seraing-v-kas-eupen/34349362",
    },
    {
      fixture_id: "34349364",
      league: "Belgian First Division B",
      team_home: "RWD Molenbeek",
      team_away: "RAAL La Louvière",
      fixture_url:
        "https://m.skybet.com/football/belgian-first-division-b/rwd-molenbeek-v-raal-la-louviere/34349364",
    },
    {
      fixture_id: "34338053",
      league: "Belgian Jupiler League",
      team_home: "KV Mechelen",
      team_away: "Oud-Heverlee Leuven",
      fixture_url:
        "https://m.skybet.com/football/belgian-jupiler-league/kv-mechelen-v-oud-heverlee-leuven/34338053",
    },
    {
      fixture_id: "34338282",
      league: "Belgian Jupiler League",
      team_home: "KV Kortrijk",
      team_away: "Genk",
      fixture_url:
        "https://m.skybet.com/football/belgian-jupiler-league/kv-kortrijk-v-genk/34338282",
    },
    {
      fixture_id: "34338526",
      league: "Belgian Jupiler League",
      team_home: "Dender",
      team_away: "Sporting de Charleroi",
      fixture_url:
        "https://m.skybet.com/football/belgian-jupiler-league/dender-v-sporting-de-charleroi/34338526",
    },
    {
      fixture_id: "34303811",
      league: "Brazilian Serie A",
      team_home: "Athlético Paranaense",
      team_away: "Botafogo RJ",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/athletico-paranaense-v-botafogo-rj/34303811",
    },
    {
      fixture_id: "34303809",
      league: "Brazilian Serie A",
      team_home: "Atlético Mineiro",
      team_away: "Vitoria BA",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/atletico-mineiro-v-vitoria-ba/34303809",
    },
    {
      fixture_id: "34303810",
      league: "Brazilian Serie A",
      team_home: "Red Bull Bragantino",
      team_away: "Palmeiras",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/red-bull-bragantino-v-palmeiras/34303810",
    },
    {
      fixture_id: "34304064",
      league: "Brazilian Serie A",
      team_home: "Bahia",
      team_away: "Flamengo",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/bahia-v-flamengo/34304064",
    },
    {
      fixture_id: "34304065",
      league: "Brazilian Serie A",
      team_home: "Corinthians",
      team_away: "SC Internacional",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/corinthians-v-sc-internacional/34304065",
    },
    {
      fixture_id: "34304066",
      league: "Brazilian Serie A",
      team_home: "Cuiabá EC",
      team_away: "Sao Paulo",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-a/cuiaba-ec-v-sao-paulo/34304066",
    },
    {
      fixture_id: "34303868",
      league: "Brazilian Serie B",
      team_home: "Ituano FC",
      team_away: "Guarani SP",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-b/ituano-fc-v-guarani-sp/34303868",
    },
    {
      fixture_id: "34303869",
      league: "Brazilian Serie B",
      team_home: "Ponte Preta",
      team_away: "Botafogo SP",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-b/ponte-preta-v-botafogo-sp/34303869",
    },
    {
      fixture_id: "34304009",
      league: "Brazilian Serie B",
      team_home: "Mirassol FC",
      team_away: "Vila Nova FC",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-b/mirassol-fc-v-vila-nova-fc/34304009",
    },
    {
      fixture_id: "34361371",
      league: "Brazilian Serie C",
      team_home: "Athletic Club",
      team_away: "Londrina",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-c/athletic-club-v-londrina/34361371",
    },
    {
      fixture_id: "34361367",
      league: "Brazilian Serie C",
      team_home: "Botafogo PB",
      team_away: "Clube do Remo",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-c/botafogo-pb-v-clube-do-remo/34361367",
    },
    {
      fixture_id: "34361370",
      league: "Brazilian Serie C",
      team_home: "Ferroviária",
      team_away: "Ypiranga AP",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-c/ferroviaria-v-ypiranga-ap/34361370",
    },
    {
      fixture_id: "34361372",
      league: "Brazilian Serie C",
      team_home: "Sao Bernardo",
      team_away: "Volta Redonda",
      fixture_url:
        "https://m.skybet.com/football/brazilian-serie-c/sao-bernardo-v-volta-redonda/34361372",
    },
    {
      fixture_id: "34349047",
      league: "Bulgarian A.PFG",
      team_home: "CSKA-Sofia",
      team_away: "Septemvri Sofia",
      fixture_url:
        "https://m.skybet.com/football/bulgarian-a-pfg/cska-sofia-v-septemvri-sofia/34349047",
    },
    {
      fixture_id: "34349289",
      league: "Bulgarian A.PFG",
      team_home: "Botev Plovdiv",
      team_away: "Levski Sofia",
      fixture_url:
        "https://m.skybet.com/football/bulgarian-a-pfg/botev-plovdiv-v-levski-sofia/34349289",
    },
    {
      fixture_id: "34184872",
      league: "Champions League",
      team_home: "Milan",
      team_away: "Club Brugge",
      fixture_url:
        "https://m.skybet.com/football/champions-league/milan-v-club-brugge/34184872",
    },
    {
      fixture_id: "34184822",
      league: "Champions League",
      team_home: "Monaco",
      team_away: "Crvena zvezda",
      fixture_url:
        "https://m.skybet.com/football/champions-league/monaco-v-crvena-zvezda/34184822",
    },
    {
      fixture_id: "34184938",
      league: "Champions League",
      team_home: "Arsenal",
      team_away: "Shakhtar Donetsk",
      fixture_url:
        "https://m.skybet.com/football/champions-league/arsenal-v-shakhtar-donetsk/34184938",
    },
    {
      fixture_id: "34184846",
      league: "Champions League",
      team_home: "Aston Villa",
      team_away: "Bologna",
      fixture_url:
        "https://m.skybet.com/football/champions-league/aston-villa-v-bologna/34184846",
    },
    {
      fixture_id: "34184813",
      league: "Champions League",
      team_home: "Girona",
      team_away: "Slovan Bratislava",
      fixture_url:
        "https://m.skybet.com/football/champions-league/girona-v-slovan-bratislava/34184813",
    },
    {
      fixture_id: "34184918",
      league: "Champions League",
      team_home: "Juventus",
      team_away: "Stuttgart",
      fixture_url:
        "https://m.skybet.com/football/champions-league/juventus-v-stuttgart/34184918",
    },
    {
      fixture_id: "34184807",
      league: "Champions League",
      team_home: "Paris St Germain",
      team_away: "PSV Eindhoven",
      fixture_url:
        "https://m.skybet.com/football/champions-league/paris-st-germain-v-psv-eindhoven/34184807",
    },
    {
      fixture_id: "34184860",
      league: "Champions League",
      team_home: "Real Madrid",
      team_away: "Dortmund",
      fixture_url:
        "https://m.skybet.com/football/champions-league/real-madrid-v-dortmund/34184860",
    },
    {
      fixture_id: "34184915",
      league: "Champions League",
      team_home: "Sturm Graz",
      team_away: "Sporting CP",
      fixture_url:
        "https://m.skybet.com/football/champions-league/sturm-graz-v-sporting-cp/34184915",
    },
    {
      fixture_id: "34349368",
      league: "Chilean Primera Division",
      team_home: "Cobresal",
      team_away: "Everton",
      fixture_url:
        "https://m.skybet.com/football/chilean-primera-division/cobresal-v-everton/34349368",
    },
    {
      fixture_id: "34344541",
      league: "Colombian Categoria Primera B",
      team_home: "Bogotá",
      team_away: "Tigres FC Zipaquira",
      fixture_url:
        "https://m.skybet.com/football/colombian-categoria-primera-b/bogota-v-tigres-fc-zipaquira/34344541",
    },
    {
      fixture_id: "34344556",
      league: "Colombian Categoria Primera B",
      team_home: "Cúcuta Deportivo",
      team_away: "Real Santander",
      fixture_url:
        "https://m.skybet.com/football/colombian-categoria-primera-b/cucuta-deportivo-v-real-santander/34344556",
    },
    {
      fixture_id: "34349693",
      league: "Costa Rican Primera Division",
      team_home: "Guanacasteca",
      team_away: "Municipal Pérez Zeledón",
      fixture_url:
        "https://m.skybet.com/football/costa-rican-primera-division/guanacasteca-v-municipal-perez-zeledon/34349693",
    },
    {
      fixture_id: "34338049",
      league: "Croatian Prva HNL",
      team_home: "NK Lokomotiva",
      team_away: "HNK Gorica",
      fixture_url:
        "https://m.skybet.com/football/croatian-prva-hnl/nk-lokomotiva-v-hnk-gorica/34338049",
    },
    {
      fixture_id: "34338294",
      league: "Croatian Prva HNL",
      team_home: "NK Slaven Belupo",
      team_away: "Rijeka",
      fixture_url:
        "https://m.skybet.com/football/croatian-prva-hnl/nk-slaven-belupo-v-rijeka/34338294",
    },
    {
      fixture_id: "34338063",
      league: "Czech First League",
      team_home: "Ceske Budejovice",
      team_away: "FC Slovacko",
      fixture_url:
        "https://m.skybet.com/football/czech-first-league/ceske-budejovice-v-fc-slovacko/34338063",
    },
    {
      fixture_id: "34338086",
      league: "Czech First League",
      team_home: "FK Teplice",
      team_away: "FK Dukla Praha",
      fixture_url:
        "https://m.skybet.com/football/czech-first-league/fk-teplice-v-fk-dukla-praha/34338086",
    },
    {
      fixture_id: "34338334",
      league: "Czech First League",
      team_home: "FC Slovan Liberec",
      team_away: "Jablonec",
      fixture_url:
        "https://m.skybet.com/football/czech-first-league/fc-slovan-liberec-v-jablonec/34338334",
    },
    {
      fixture_id: "34349291",
      league: "Danish 1st Division",
      team_home: "Hvidovre IF",
      team_away: "Kolding",
      fixture_url:
        "https://m.skybet.com/football/danish-1st-division/hvidovre-if-v-kolding/34349291",
    },
    {
      fixture_id: "34354061",
      league: "Danish Superliga",
      team_home: "Randers FC",
      team_away: "Lyngby BK",
      fixture_url:
        "https://m.skybet.com/football/danish-superliga/randers-fc-v-lyngby-bk/34354061",
    },
    {
      fixture_id: "34354059",
      league: "Danish Superliga",
      team_home: "Sønderjyske",
      team_away: "Nordsjaelland",
      fixture_url:
        "https://m.skybet.com/football/danish-superliga/snderjyske-v-nordsjaelland/34354059",
    },
    {
      fixture_id: "34354705",
      league: "Danish Superliga",
      team_home: "Viborg FF",
      team_away: "AGF Aarhus",
      fixture_url:
        "https://m.skybet.com/football/danish-superliga/viborg-ff-v-agf-aarhus/34354705",
    },
    {
      fixture_id: "34354816",
      league: "Danish Superliga",
      team_home: "Brøndby IF",
      team_away: "FC Midtjylland",
      fixture_url:
        "https://m.skybet.com/football/danish-superliga/brndby-if-v-fc-midtjylland/34354816",
    },
    {
      fixture_id: "34354929",
      league: "Danish Superliga",
      team_home: "Silkeborg IF",
      team_away: "FC København",
      fixture_url:
        "https://m.skybet.com/football/danish-superliga/silkeborg-if-v-fc-kbenhavn/34354929",
    },
    {
      fixture_id: "34349275",
      league: "Dutch Eredivisie",
      team_home: "NAC Breda",
      team_away: "NEC Nijmegen",
      fixture_url:
        "https://m.skybet.com/football/dutch-eredivisie/nac-breda-v-nec-nijmegen/34349275",
    },
    {
      fixture_id: "34349365",
      league: "Dutch Eredivisie",
      team_home: "PSV Eindhoven",
      team_away: "Sparta Rotterdam",
      fixture_url:
        "https://m.skybet.com/football/dutch-eredivisie/psv-eindhoven-v-sparta-rotterdam/34349365",
    },
    {
      fixture_id: "34349463",
      league: "Dutch Eredivisie",
      team_home: "Utrecht",
      team_away: "RKC Waalwijk",
      fixture_url:
        "https://m.skybet.com/football/dutch-eredivisie/utrecht-v-rkc-waalwijk/34349463",
    },
    {
      fixture_id: "34338562",
      league: "Ecuadorian Serie A",
      team_home: "Mushuc Runa",
      team_away: "Independiente del Valle",
      fixture_url:
        "https://m.skybet.com/football/ecuadorian-serie-a/mushuc-runa-v-independiente-del-valle/34338562",
    },
    {
      fixture_id: "34338777",
      league: "Ecuadorian Serie A",
      team_home: "Deportivo Cuenca",
      team_away: "Club Deportivo Técnico Universitario",
      fixture_url:
        "https://m.skybet.com/football/ecuadorian-serie-a/deportivo-cuenca-v-club-deportivo-tecnico-universitario/34338777",
    },
    {
      fixture_id: "34338898",
      league: "Ecuadorian Serie A",
      team_home: "El Nacional",
      team_away: "Barcelona",
      fixture_url:
        "https://m.skybet.com/football/ecuadorian-serie-a/el-nacional-v-barcelona/34338898",
    },
    {
      fixture_id: "34303160",
      league: "English National League",
      team_home: "AFC Fylde",
      team_away: "Aldershot",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/afc-fylde-v-aldershot/34303160",
    },
    {
      fixture_id: "34303148",
      league: "English National League",
      team_home: "Barnet",
      team_away: "Boston Utd",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/barnet-v-boston-utd/34303148",
    },
    {
      fixture_id: "34303147",
      league: "English National League",
      team_home: "Braintree",
      team_away: "Altrincham",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/braintree-v-altrincham/34303147",
    },
    {
      fixture_id: "34303145",
      league: "English National League",
      team_home: "Eastleigh",
      team_away: "Forest Green",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/eastleigh-v-forest-green/34303145",
    },
    {
      fixture_id: "34303146",
      league: "English National League",
      team_home: "Ebbsfleet United",
      team_away: "Rochdale",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/ebbsfleet-united-v-rochdale/34303146",
    },
    {
      fixture_id: "34303138",
      league: "English National League",
      team_home: "Gateshead",
      team_away: "Wealdstone",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/gateshead-v-wealdstone/34303138",
    },
    {
      fixture_id: "34303134",
      league: "English National League",
      team_home: "Halifax",
      team_away: "Tamworth",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/halifax-v-tamworth/34303134",
    },
    {
      fixture_id: "34303140",
      league: "English National League",
      team_home: "Hartlepool",
      team_away: "Sutton",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/hartlepool-v-sutton/34303140",
    },
    {
      fixture_id: "34303133",
      league: "English National League",
      team_home: "Oldham",
      team_away: "Solihull",
      fixture_url:
        "https://m.skybet.com/football/english-national-league/oldham-v-solihull/34303133",
    },
    {
      fixture_id: "34338054",
      league: "English National League North & South",
      team_home: "Alfreton",
      team_away: "Hereford",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/alfreton-v-hereford/34338054",
    },
    {
      fixture_id: "34338080",
      league: "English National League North & South",
      team_home: "Buxton",
      team_away: "Curzon Ashton",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/buxton-v-curzon-ashton/34338080",
    },
    {
      fixture_id: "34338074",
      league: "English National League North & South",
      team_home: "Chelmsford",
      team_away: "Eastbourne",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/chelmsford-v-eastbourne/34338074",
    },
    {
      fixture_id: "34338082",
      league: "English National League North & South",
      team_home: "Chesham Utd",
      team_away: "Bath",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/chesham-utd-v-bath/34338082",
    },
    {
      fixture_id: "34338079",
      league: "English National League North & South",
      team_home: "Chester",
      team_away: "Farsley Celtic FC",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/chester-v-farsley-celtic-fc/34338079",
    },
    {
      fixture_id: "34338081",
      league: "English National League North & South",
      team_home: "Chippenham",
      team_away: "Boreham Wood",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/chippenham-v-boreham-wood/34338081",
    },
    {
      fixture_id: "34338078",
      league: "English National League North & South",
      team_home: "Chorley",
      team_away: "Warrington",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/chorley-v-warrington/34338078",
    },
    {
      fixture_id: "34338057",
      league: "English National League North & South",
      team_home: "Dorking",
      team_away: "Hornchurch",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/dorking-v-hornchurch/34338057",
    },
    {
      fixture_id: "34338088",
      league: "English National League North & South",
      team_home: "Enfield Town",
      team_away: "Weymouth",
      fixture_url:
        "https://m.skybet.com/football/english-national-league-north---south/enfield-town-v-weymouth/34338088",
    },
    {
      fixture_id: "34348955",
      league: "Finnish Veikkausliga",
      team_home: "EIF",
      team_away: "AC Oulu",
      fixture_url:
        "https://m.skybet.com/football/finnish-veikkausliga/eif-v-ac-oulu/34348955",
    },
    {
      fixture_id: "34348957",
      league: "Finnish Veikkausliga",
      team_home: "SJK",
      team_away: "KuPS",
      fixture_url:
        "https://m.skybet.com/football/finnish-veikkausliga/sjk-v-kups/34348957",
    },
    {
      fixture_id: "34354062",
      league: "Finnish Ykkosliiga",
      team_home: "SJK Akatemia",
      team_away: "PK-35 Helsinki",
      fixture_url:
        "https://m.skybet.com/football/finnish-ykkosliiga/sjk-akatemia-v-pk-35-helsinki/34354062",
    },
    {
      fixture_id: "34354777",
      league: "Finnish Ykkosliiga",
      team_home: "MP Mikkelin",
      team_away: "KTP",
      fixture_url:
        "https://m.skybet.com/football/finnish-ykkosliiga/mp-mikkelin-v-ktp/34354777",
    },
    {
      fixture_id: "34303259",
      league: "French Ligue 1",
      team_home: "St Etienne",
      team_away: "AJ Auxerre",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/st-etienne-v-aj-auxerre/34303259",
    },
    {
      fixture_id: "34303477",
      league: "French Ligue 1",
      team_home: "Lille",
      team_away: "Toulouse",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/lille-v-toulouse/34303477",
    },
    {
      fixture_id: "34303770",
      league: "French Ligue 1",
      team_home: "Rennes",
      team_away: "Monaco",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-1/rennes-v-monaco/34303770",
    },
    {
      fixture_id: "34338416",
      league: "French Ligue 2",
      team_home: "Metz",
      team_away: "Amiens SC",
      fixture_url:
        "https://m.skybet.com/football/french-ligue-2/metz-v-amiens-sc/34338416",
    },
    {
      fixture_id: "34338148",
      league: "German 3. Liga",
      team_home: "Alemannia Aachen",
      team_away: "FC Ingolstadt 04",
      fixture_url:
        "https://m.skybet.com/football/german-3--liga/alemannia-aachen-v-fc-ingolstadt-04/34338148",
    },
    {
      fixture_id: "34142136",
      league: "German Bundesliga",
      team_home: "FC St. Pauli",
      team_away: "Mainz",
      fixture_url:
        "https://m.skybet.com/football/german-bundesliga/fc-st-pauli-v-mainz/34142136",
    },
    {
      fixture_id: "34338465",
      league: "German Bundesliga 2",
      team_home: "Schalke",
      team_away: "Hertha Berlin",
      fixture_url:
        "https://m.skybet.com/football/german-bundesliga-2/schalke-v-hertha-berlin/34338465",
    },
    {
      fixture_id: "34338254",
      league: "Greek Super League",
      team_home: "Atromitos Athens",
      team_away: "NFC Volos",
      fixture_url:
        "https://m.skybet.com/football/greek-super-league/atromitos-athens-v-nfc-volos/34338254",
    },
    {
      fixture_id: "34338293",
      league: "Greek Super League",
      team_home: "Panaitolikos",
      team_away: "AEK Athens",
      fixture_url:
        "https://m.skybet.com/football/greek-super-league/panaitolikos-v-aek-athens/34338293",
    },
    {
      fixture_id: "34338322",
      league: "Greek Super League",
      team_home: "Aris Thessaloniki",
      team_away: "Lamia",
      fixture_url:
        "https://m.skybet.com/football/greek-super-league/aris-thessaloniki-v-lamia/34338322",
    },
    {
      fixture_id: "34348964",
      league: "Icelandic Urvalsdeild Karla",
      team_home: "Fram",
      team_away: "IF Vestri",
      fixture_url:
        "https://m.skybet.com/football/icelandic-urvalsdeild-karla/fram-v-if-vestri/34348964",
    },
    {
      fixture_id: "34303137",
      league: "Indian Super League",
      team_home: "Mohun Bagan",
      team_away: "Mohammedan",
      fixture_url:
        "https://m.skybet.com/football/indian-super-league/mohun-bagan-v-mohammedan/34303137",
    },
    {
      fixture_id: "34303398",
      league: "Italian Serie A",
      team_home: "Atalanta",
      team_away: "Genoa",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-a/atalanta-v-genoa/34303398",
    },
    {
      fixture_id: "34303756",
      league: "Italian Serie A",
      team_home: "Inter",
      team_away: "Torino",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-a/inter-v-torino/34303756",
    },
    {
      fixture_id: "34343469",
      league: "Italian Serie B",
      team_home: "Catanzaro",
      team_away: "Modena",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-b/catanzaro-v-modena/34343469",
    },
    {
      fixture_id: "34343465",
      league: "Italian Serie B",
      team_home: "Cosenza",
      team_away: "Südtirol",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-b/cosenza-v-sudtirol/34343465",
    },
    {
      fixture_id: "34343467",
      league: "Italian Serie B",
      team_home: "Cremonese",
      team_away: "Bari",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-b/cremonese-v-bari/34343467",
    },
    {
      fixture_id: "34343474",
      league: "Italian Serie B",
      team_home: "Mantova",
      team_away: "Brescia",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-b/mantova-v-brescia/34343474",
    },
    {
      fixture_id: "34343470",
      league: "Italian Serie B",
      team_home: "Palermo",
      team_away: "Salernitana",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-b/palermo-v-salernitana/34343470",
    },
    {
      fixture_id: "34343653",
      league: "Italian Serie C",
      team_home: "Arzignano Valchiampo",
      team_away: "Alcione Milano",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-c/arzignano-valchiampo-v-alcione-milano/34343653",
    },
    {
      fixture_id: "34343651",
      league: "Italian Serie C",
      team_home: "Lumezzane",
      team_away: "Trento",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-c/lumezzane-v-trento/34343651",
    },
    {
      fixture_id: "34343654",
      league: "Italian Serie C",
      team_home: "Picerno",
      team_away: "Cavese",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-c/picerno-v-cavese/34343654",
    },
    {
      fixture_id: "34343652",
      league: "Italian Serie C",
      team_home: "Team Altamura",
      team_away: "S.S. Monopoli 1966",
      fixture_url:
        "https://m.skybet.com/football/italian-serie-c/team-altamura-v-ss-monopoli-1966/34343652",
    },
    {
      fixture_id: "34304347",
      league: "Japanese J League",
      team_home: "Kyoto Sanga FC",
      team_away: "Vissel Kobe",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league/kyoto-sanga-fc-v-vissel-kobe/34304347",
    },
    {
      fixture_id: "34307308",
      league: "Japanese J League",
      team_home: "Jubilo Iwata",
      team_away: "Sanfrecce Hiroshima",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league/jubilo-iwata-v-sanfrecce-hiroshima/34307308",
    },
    {
      fixture_id: "34307307",
      league: "Japanese J League",
      team_home: "Tokyo Verdy",
      team_away: "Shonan Bellmare",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league/tokyo-verdy-v-shonan-bellmare/34307307",
    },
    {
      fixture_id: "34304346",
      league: "Japanese J League 2",
      team_home: "Kumamoto",
      team_away: "Tokushima",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/kumamoto-v-tokushima/34304346",
    },
    {
      fixture_id: "34304350",
      league: "Japanese J League 2",
      team_home: "Mito HollyHock",
      team_away: "Shimizu S-Pulse",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/mito-hollyhock-v-shimizu-s-pulse/34304350",
    },
    {
      fixture_id: "34304351",
      league: "Japanese J League 2",
      team_home: "Montedio Yamagata",
      team_away: "Renofa Yamaguchi",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/montedio-yamagata-v-renofa-yamaguchi/34304351",
    },
    {
      fixture_id: "34304352",
      league: "Japanese J League 2",
      team_home: "Tochigi S.C.",
      team_away: "Ehime",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/tochigi-sc-v-ehime/34304352",
    },
    {
      fixture_id: "34304349",
      league: "Japanese J League 2",
      team_home: "V-Varen Nagasaki",
      team_away: "Oita Trinita",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/v-varen-nagasaki-v-oita-trinita/34304349",
    },
    {
      fixture_id: "34304348",
      league: "Japanese J League 2",
      team_home: "Yokohama FC",
      team_away: "Kagoshima United",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/yokohama-fc-v-kagoshima-united/34304348",
    },
    {
      fixture_id: "34304409",
      league: "Japanese J League 2",
      team_home: "Vegalta Sendai",
      team_away: "Blaublitz Akita",
      fixture_url:
        "https://m.skybet.com/football/japanese-j-league-2/vegalta-sendai-v-blaublitz-akita/34304409",
    },
    {
      fixture_id: "34350248",
      league: "Korean K League 1",
      team_home: "Daegu FC",
      team_away: "Jeonbuk Motors FC",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/daegu-fc-v-jeonbuk-motors-fc/34350248",
    },
    {
      fixture_id: "34350250",
      league: "Korean K League 1",
      team_home: "Gwangju FC",
      team_away: "FC Seoul",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/gwangju-fc-v-fc-seoul/34350250",
    },
    {
      fixture_id: "34350252",
      league: "Korean K League 1",
      team_home: "Incheon United",
      team_away: "Gangwon FC",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/incheon-united-v-gangwon-fc/34350252",
    },
    {
      fixture_id: "34350249",
      league: "Korean K League 1",
      team_home: "Jeju Utd",
      team_away: "Daejeon Citizen",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/jeju-utd-v-daejeon-citizen/34350249",
    },
    {
      fixture_id: "34350247",
      league: "Korean K League 1",
      team_home: "Pohang Steelers",
      team_away: "Suwon FC",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/pohang-steelers-v-suwon-fc/34350247",
    },
    {
      fixture_id: "34350251",
      league: "Korean K League 1",
      team_home: "Ulsan HD",
      team_away: "Gimcheon Sangmu FC",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-1/ulsan-hd-v-gimcheon-sangmu-fc/34350251",
    },
    {
      fixture_id: "34348011",
      league: "Korean K League 2",
      team_home: "Suwon Samsung Bluewings FC",
      team_away: "FC Anyang",
      fixture_url:
        "https://m.skybet.com/football/korean-k-league-2/suwon-samsung-bluewings-fc-v-fc-anyang/34348011",
    },
    {
      fixture_id: "34349771",
      league: "Mexican Liga MX",
      team_home: "Atlético San Luis",
      team_away: "Monterrey",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/atletico-san-luis-v-monterrey/34349771",
    },
    {
      fixture_id: "34349772",
      league: "Mexican Liga MX",
      team_home: "Cruz Azul",
      team_away: "Club Necaxa",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/cruz-azul-v-club-necaxa/34349772",
    },
    {
      fixture_id: "34349774",
      league: "Mexican Liga MX",
      team_home: "Tigres",
      team_away: "Puebla",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/tigres-v-puebla/34349774",
    },
    {
      fixture_id: "34349942",
      league: "Mexican Liga MX",
      team_home: "Deportivo Toluca",
      team_away: "Pumas UNAM",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/deportivo-toluca-v-pumas-unam/34349942",
    },
    {
      fixture_id: "34349945",
      league: "Mexican Liga MX",
      team_home: "Guadalajara",
      team_away: "Atlas",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/guadalajara-v-atlas/34349945",
    },
    {
      fixture_id: "34350153",
      league: "Mexican Liga MX",
      team_home: "Club Leon",
      team_away: "CF America",
      fixture_url:
        "https://m.skybet.com/football/mexican-liga-mx/club-leon-v-cf-america/34350153",
    },
    {
      fixture_id: "34338073",
      league: "Northern Irish Premiership",
      team_home: "Ballymena United",
      team_away: "Loughgall",
      fixture_url:
        "https://m.skybet.com/football/northern-irish-premiership/ballymena-united-v-loughgall/34338073",
    },
    {
      fixture_id: "34338089",
      league: "Northern Irish Premiership",
      team_home: "Carrick Rangers",
      team_away: "Cliftonville",
      fixture_url:
        "https://m.skybet.com/football/northern-irish-premiership/carrick-rangers-v-cliftonville/34338089",
    },
    {
      fixture_id: "34338087",
      league: "Northern Irish Premiership",
      team_home: "Crusaders",
      team_away: "Coleraine",
      fixture_url:
        "https://m.skybet.com/football/northern-irish-premiership/crusaders-v-coleraine/34338087",
    },
    {
      fixture_id: "34338071",
      league: "Northern Irish Premiership",
      team_home: "Glenavon",
      team_away: "Portadown",
      fixture_url:
        "https://m.skybet.com/football/northern-irish-premiership/glenavon-v-portadown/34338071",
    },
    {
      fixture_id: "34349712",
      league: "Paraguayan Primera Division",
      team_home: "Club Sportivo Luqueño",
      team_away: "Cerro Porteño",
      fixture_url:
        "https://m.skybet.com/football/paraguayan-primera-division/club-sportivo-luqueno-v-cerro-porteno/34349712",
    },
    {
      fixture_id: "34349139",
      league: "Polish Ekstraklasa",
      team_home: "Górnik Zabrze",
      team_away: "Zaglebie Lubin",
      fixture_url:
        "https://m.skybet.com/football/polish-ekstraklasa/gornik-zabrze-v-zaglebie-lubin/34349139",
    },
    {
      fixture_id: "34349404",
      league: "Polish Ekstraklasa",
      team_home: "Lech Poznań",
      team_away: "Motor Lublin",
      fixture_url:
        "https://m.skybet.com/football/polish-ekstraklasa/lech-poznan-v-motor-lublin/34349404",
    },
    {
      fixture_id: "34338253",
      league: "Polish First League",
      team_home: "Wisla Plock",
      team_away: "Polonia Warszawa",
      fixture_url:
        "https://m.skybet.com/football/polish-first-league/wisla-plock-v-polonia-warszawa/34338253",
    },
    {
      fixture_id: "34338398",
      league: "Polish First League",
      team_home: "Pogoń Siedlce",
      team_away: "Wisla Krakow",
      fixture_url:
        "https://m.skybet.com/football/polish-first-league/pogon-siedlce-v-wisla-krakow/34338398",
    },
    {
      fixture_id: "34349044",
      league: "Portuguese Primeira Liga",
      team_home: "Gil Vicente",
      team_away: "Club Football Estrela",
      fixture_url:
        "https://m.skybet.com/football/portuguese-primeira-liga/gil-vicente-v-club-football-estrela/34349044",
    },
    {
      fixture_id: "34349046",
      league: "Portuguese Primeira Liga",
      team_home: "Moreirense FC",
      team_away: "Santa Clara",
      fixture_url:
        "https://m.skybet.com/football/portuguese-primeira-liga/moreirense-fc-v-santa-clara/34349046",
    },
    {
      fixture_id: "34349292",
      league: "Portuguese Primeira Liga",
      team_home: "Futebol Clube de Arouca",
      team_away: "AVS",
      fixture_url:
        "https://m.skybet.com/football/portuguese-primeira-liga/futebol-clube-de-arouca-v-avs/34349292",
    },
    {
      fixture_id: "34349490",
      league: "Portuguese Primeira Liga",
      team_home: "Sporting CP",
      team_away: "Casa Pia",
      fixture_url:
        "https://m.skybet.com/football/portuguese-primeira-liga/sporting-cp-v-casa-pia/34349490",
    },
    {
      fixture_id: "34068839",
      league: "Premier League",
      team_home: "Arsenal",
      team_away: "Southampton",
      fixture_url:
        "https://m.skybet.com/football/premier-league/arsenal-v-southampton/34068839",
    },
    {
      fixture_id: "34068835",
      league: "Premier League",
      team_home: "Brentford",
      team_away: "Wolves",
      fixture_url:
        "https://m.skybet.com/football/premier-league/brentford-v-wolves/34068835",
    },
    {
      fixture_id: "34068852",
      league: "Premier League",
      team_home: "Leicester",
      team_away: "Bournemouth",
      fixture_url:
        "https://m.skybet.com/football/premier-league/leicester-v-bournemouth/34068852",
    },
    {
      fixture_id: "34068826",
      league: "Premier League",
      team_home: "Manchester City",
      team_away: "Fulham",
      fixture_url:
        "https://m.skybet.com/football/premier-league/manchester-city-v-fulham/34068826",
    },
    {
      fixture_id: "34068828",
      league: "Premier League",
      team_home: "West Ham",
      team_away: "Ipswich",
      fixture_url:
        "https://m.skybet.com/football/premier-league/west-ham-v-ipswich/34068828",
    },
    {
      fixture_id: "34069044",
      league: "Premier League",
      team_home: "Everton",
      team_away: "Newcastle",
      fixture_url:
        "https://m.skybet.com/football/premier-league/everton-v-newcastle/34069044",
    },
    {
      fixture_id: "34344035",
      league: "Rep. Ireland First Division",
      team_home: "Longford",
      team_away: "Athlone Town",
      fixture_url:
        "https://m.skybet.com/football/rep--ireland-first-division/longford-v-athlone-town/34344035",
    },
    {
      fixture_id: "34354869",
      league: "Rep. Ireland Premier Division",
      team_home: "Shamrock Rovers",
      team_away: "Shelbourne FC",
      fixture_url:
        "https://m.skybet.com/football/rep--ireland-premier-division/shamrock-rovers-v-shelbourne-fc/34354869",
    },
    {
      fixture_id: "34360253",
      league: "Romania Liga I",
      team_home: "Unirea Slobozia",
      team_away: "Universitatea Cluj",
      fixture_url:
        "https://m.skybet.com/football/romania-liga-i/unirea-slobozia-v-universitatea-cluj/34360253",
    },
    {
      fixture_id: "34360400",
      league: "Romania Liga I",
      team_home: "CFR Cluj",
      team_away: "CS Municipal Studentesc Iasi",
      fixture_url:
        "https://m.skybet.com/football/romania-liga-i/cfr-cluj-v-cs-municipal-studentesc-iasi/34360400",
    },
    {
      fixture_id: "34360792",
      league: "Romania Liga I",
      team_home: "Oţelul",
      team_away: "CS Universitatea Craiova",
      fixture_url:
        "https://m.skybet.com/football/romania-liga-i/otelul-v-cs-universitatea-craiova/34360792",
    },
    {
      fixture_id: "34338246",
      league: "Saudi Arabian Pro League",
      team_home: "Al-Nassr Riyadh",
      team_away: "Al-Orobah Al-Jawf",
      fixture_url:
        "https://m.skybet.com/football/saudi-arabian-pro-league/al-nassr-riyadh-v-al-orobah-al-jawf/34338246",
    },
    {
      fixture_id: "34338256",
      league: "Saudi Arabian Pro League",
      team_home: "Al-Taawoun",
      team_away: "Al-Fateh Al-Hasa",
      fixture_url:
        "https://m.skybet.com/football/saudi-arabian-pro-league/al-taawoun-v-al-fateh-al-hasa/34338256",
    },
    {
      fixture_id: "34338417",
      league: "Saudi Arabian Pro League",
      team_home: "Al Ahli",
      team_away: "Al Hilal",
      fixture_url:
        "https://m.skybet.com/football/saudi-arabian-pro-league/al-ahli-v-al-hilal/34338417",
    },
    {
      fixture_id: "34338047",
      league: "Scottish Championship",
      team_home: "Airdrie",
      team_away: "Dunfermline",
      fixture_url:
        "https://m.skybet.com/football/scottish-championship/airdrie-v-dunfermline/34338047",
    },
    {
      fixture_id: "34338067",
      league: "Scottish Championship",
      team_home: "Falkirk",
      team_away: "Ayr",
      fixture_url:
        "https://m.skybet.com/football/scottish-championship/falkirk-v-ayr/34338067",
    },
    {
      fixture_id: "34338062",
      league: "Scottish Championship",
      team_home: "Greenock Morton",
      team_away: "Raith",
      fixture_url:
        "https://m.skybet.com/football/scottish-championship/greenock-morton-v-raith/34338062",
    },
    {
      fixture_id: "34338055",
      league: "Scottish Championship",
      team_home: "Partick Thistle",
      team_away: "Livingston",
      fixture_url:
        "https://m.skybet.com/football/scottish-championship/partick-thistle-v-livingston/34338055",
    },
    {
      fixture_id: "34338076",
      league: "Scottish Championship",
      team_home: "Queens Park",
      team_away: "Hamilton",
      fixture_url:
        "https://m.skybet.com/football/scottish-championship/queens-park-v-hamilton/34338076",
    },
    {
      fixture_id: "34338072",
      league: "Scottish League 1",
      team_home: "Alloa Athletic",
      team_away: "Cove",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-1/alloa-athletic-v-cove/34338072",
    },
    {
      fixture_id: "34338048",
      league: "Scottish League 1",
      team_home: "Annan",
      team_away: "Montrose",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-1/annan-v-montrose/34338048",
    },
    {
      fixture_id: "34338059",
      league: "Scottish League 1",
      team_home: "Arbroath",
      team_away: "Inverness",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-1/arbroath-v-inverness/34338059",
    },
    {
      fixture_id: "34338069",
      league: "Scottish League 1",
      team_home: "Dumbarton",
      team_away: "Stenhousemuir",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-1/dumbarton-v-stenhousemuir/34338069",
    },
    {
      fixture_id: "34338050",
      league: "Scottish League 1",
      team_home: "Queen of South",
      team_away: "Kelty Hearts",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-1/queen-of-south-v-kelty-hearts/34338050",
    },
    {
      fixture_id: "34348986",
      league: "Scottish League 2",
      team_home: "Clyde",
      team_away: "Spartans",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-2/clyde-v-spartans/34348986",
    },
    {
      fixture_id: "34348998",
      league: "Scottish League 2",
      team_home: "East Fife",
      team_away: "Bonnyrigg Rose Athletic",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-2/east-fife-v-bonnyrigg-rose-athletic/34348998",
    },
    {
      fixture_id: "34348953",
      league: "Scottish League 2",
      team_home: "FC Edinburgh",
      team_away: "Stranraer",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-2/fc-edinburgh-v-stranraer/34348953",
    },
    {
      fixture_id: "34348975",
      league: "Scottish League 2",
      team_home: "Peterhead",
      team_away: "Elgin",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-2/peterhead-v-elgin/34348975",
    },
    {
      fixture_id: "34349021",
      league: "Scottish League 2",
      team_home: "Stirling",
      team_away: "Forfar",
      fixture_url:
        "https://m.skybet.com/football/scottish-league-2/stirling-v-forfar/34349021",
    },
    {
      fixture_id: "34068838",
      league: "Scottish Premiership",
      team_home: "Dundee",
      team_away: "Kilmarnock",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/dundee-v-kilmarnock/34068838",
    },
    {
      fixture_id: "34068807",
      league: "Scottish Premiership",
      team_home: "Hibernian",
      team_away: "Motherwell",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/hibernian-v-motherwell/34068807",
    },
    {
      fixture_id: "34068846",
      league: "Scottish Premiership",
      team_home: "St Mirren",
      team_away: "Dundee United",
      fixture_url:
        "https://m.skybet.com/football/scottish-premiership/st-mirren-v-dundee-united/34068846",
    },
    {
      fixture_id: "34332791",
      league: "Serbian Meridian Superliga",
      team_home: "Železničar Pančevo",
      team_away: "FK Mladost Lucani",
      fixture_url:
        "https://m.skybet.com/football/serbian-meridian-superliga/zeleznicar-pancevo-v-fk-mladost-lucani/34332791",
    },
    {
      fixture_id: "34332788",
      league: "Serbian Meridian Superliga",
      team_home: "Partizan Belgrade",
      team_away: "Tekstilac Odžaci",
      fixture_url:
        "https://m.skybet.com/football/serbian-meridian-superliga/partizan-belgrade-v-tekstilac-odzaci/34332788",
    },
    {
      fixture_id: "34068834",
      league: "Sky Bet Championship",
      team_home: "Coventry",
      team_away: "Sheffield Wednesday",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/coventry-v-sheffield-wednesday/34068834",
    },
    {
      fixture_id: "34068857",
      league: "Sky Bet Championship",
      team_home: "Derby",
      team_away: "QPR",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/derby-v-qpr/34068857",
    },
    {
      fixture_id: "34068858",
      league: "Sky Bet Championship",
      team_home: "Plymouth",
      team_away: "Blackburn",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/plymouth-v-blackburn/34068858",
    },
    {
      fixture_id: "34068849",
      league: "Sky Bet Championship",
      team_home: "Sheffield Utd",
      team_away: "Luton Town",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/sheffield-utd-v-luton-town/34068849",
    },
    {
      fixture_id: "34068794",
      league: "Sky Bet Championship",
      team_home: "Swansea",
      team_away: "Stoke",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/swansea-v-stoke/34068794",
    },
    {
      fixture_id: "34068817",
      league: "Sky Bet Championship",
      team_home: "Watford",
      team_away: "Middlesbrough",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/watford-v-middlesbrough/34068817",
    },
    {
      fixture_id: "34068806",
      league: "Sky Bet Championship",
      team_home: "West Brom",
      team_away: "Millwall",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-championship/west-brom-v-millwall/34068806",
    },
    {
      fixture_id: "34068842",
      league: "Sky Bet League One",
      team_home: "Bolton",
      team_away: "Shrewsbury",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/bolton-v-shrewsbury/34068842",
    },
    {
      fixture_id: "34068808",
      league: "Sky Bet League One",
      team_home: "Burton",
      team_away: "Bristol Rovers",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/burton-v-bristol-rovers/34068808",
    },
    {
      fixture_id: "34068815",
      league: "Sky Bet League One",
      team_home: "Charlton",
      team_away: "Birmingham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/charlton-v-birmingham/34068815",
    },
    {
      fixture_id: "34068816",
      league: "Sky Bet League One",
      team_home: "Exeter",
      team_away: "Cambridge",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/exeter-v-cambridge/34068816",
    },
    {
      fixture_id: "34068813",
      league: "Sky Bet League One",
      team_home: "Lincoln",
      team_away: "Leyton Orient",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/lincoln-v-leyton-orient/34068813",
    },
    {
      fixture_id: "34068855",
      league: "Sky Bet League One",
      team_home: "Mansfield",
      team_away: "Blackpool",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/mansfield-v-blackpool/34068855",
    },
    {
      fixture_id: "34068804",
      league: "Sky Bet League One",
      team_home: "Rotherham",
      team_away: "Reading",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/rotherham-v-reading/34068804",
    },
    {
      fixture_id: "34068825",
      league: "Sky Bet League One",
      team_home: "Stockport County",
      team_away: "Wigan",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/stockport-county-v-wigan/34068825",
    },
    {
      fixture_id: "34068798",
      league: "Sky Bet League One",
      team_home: "Wrexham",
      team_away: "Northampton",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-one/wrexham-v-northampton/34068798",
    },
    {
      fixture_id: "34068844",
      league: "Sky Bet League Two",
      team_home: "Accrington",
      team_away: "Morecambe",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/accrington-v-morecambe/34068844",
    },
    {
      fixture_id: "34068851",
      league: "Sky Bet League Two",
      team_home: "Barrow",
      team_away: "Cheltenham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/barrow-v-cheltenham/34068851",
    },
    {
      fixture_id: "34068805",
      league: "Sky Bet League Two",
      team_home: "Chesterfield",
      team_away: "Walsall",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/chesterfield-v-walsall/34068805",
    },
    {
      fixture_id: "34068790",
      league: "Sky Bet League Two",
      team_home: "Colchester",
      team_away: "Carlisle",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/colchester-v-carlisle/34068790",
    },
    {
      fixture_id: "34068853",
      league: "Sky Bet League Two",
      team_home: "Crewe",
      team_away: "Gillingham",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/crewe-v-gillingham/34068853",
    },
    {
      fixture_id: "34068827",
      league: "Sky Bet League Two",
      team_home: "MK Dons",
      team_away: "Tranmere",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/mk-dons-v-tranmere/34068827",
    },
    {
      fixture_id: "34068795",
      league: "Sky Bet League Two",
      team_home: "Notts County",
      team_away: "Port Vale",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/notts-county-v-port-vale/34068795",
    },
    {
      fixture_id: "34068810",
      league: "Sky Bet League Two",
      team_home: "Salford",
      team_away: "AFC Wimbledon",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/salford-v-afc-wimbledon/34068810",
    },
    {
      fixture_id: "34068822",
      league: "Sky Bet League Two",
      team_home: "Swindon",
      team_away: "Harrogate",
      fixture_url:
        "https://m.skybet.com/football/sky-bet-league-two/swindon-v-harrogate/34068822",
    },
    {
      fixture_id: "34349188",
      league: "Slovakian Super Liga",
      team_home: "FC Košice",
      team_away: "MFK Ružomberok",
      fixture_url:
        "https://m.skybet.com/football/slovakian-super-liga/fc-kosice-v-mfk-ruzomberok/34349188",
    },
    {
      fixture_id: "34349181",
      league: "Slovakian Super Liga",
      team_home: "Podbrezová",
      team_away: "Spartak Trnava",
      fixture_url:
        "https://m.skybet.com/football/slovakian-super-liga/podbrezova-v-spartak-trnava/34349181",
    },
    {
      fixture_id: "34349182",
      league: "Slovakian Super Liga",
      team_home: "Skalica",
      team_away: "Komárno",
      fixture_url:
        "https://m.skybet.com/football/slovakian-super-liga/skalica-v-komarno/34349182",
    },
    {
      fixture_id: "34349429",
      league: "Slovakian Super Liga",
      team_home: "Slovan Bratislava",
      team_away: "AS Trencín",
      fixture_url:
        "https://m.skybet.com/football/slovakian-super-liga/slovan-bratislava-v-as-trencin/34349429",
    },
    {
      fixture_id: "34349405",
      league: "Slovenian Premier League",
      team_home: "NŠ Mura",
      team_away: "NK Domžale",
      fixture_url:
        "https://m.skybet.com/football/slovenian-premier-league/ns-mura-v-nk-domzale/34349405",
    },
    {
      fixture_id: "34147642",
      league: "Spanish La Liga",
      team_home: "Getafe",
      team_away: "Osasuna",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/getafe-v-osasuna/34147642",
    },
    {
      fixture_id: "34147634",
      league: "Spanish La Liga",
      team_home: "Las Palmas",
      team_away: "Celta Vigo",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/las-palmas-v-celta-vigo/34147634",
    },
    {
      fixture_id: "34147655",
      league: "Spanish La Liga",
      team_home: "Valladolid",
      team_away: "Rayo Vallecano",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/valladolid-v-rayo-vallecano/34147655",
    },
    {
      fixture_id: "34147653",
      league: "Spanish La Liga",
      team_home: "Real Madrid",
      team_away: "Villarreal",
      fixture_url:
        "https://m.skybet.com/football/spanish-la-liga/real-madrid-v-villarreal/34147653",
    },
    {
      fixture_id: "34225127",
      league: "Spanish Segunda",
      team_home: "Eibar",
      team_away: "Sporting Gijon",
      fixture_url:
        "https://m.skybet.com/football/spanish-segunda/eibar-v-sporting-gijon/34225127",
    },
    {
      fixture_id: "34225119",
      league: "Spanish Segunda",
      team_home: "Mirandes",
      team_away: "Granada",
      fixture_url:
        "https://m.skybet.com/football/spanish-segunda/mirandes-v-granada/34225119",
    },
    {
      fixture_id: "34225114",
      league: "Spanish Segunda",
      team_home: "Almería",
      team_away: "Burgos",
      fixture_url:
        "https://m.skybet.com/football/spanish-segunda/almeria-v-burgos/34225114",
    },
    {
      fixture_id: "34225116",
      league: "Spanish Segunda",
      team_home: "Real Zaragoza",
      team_away: "Racing Santander",
      fixture_url:
        "https://m.skybet.com/football/spanish-segunda/real-zaragoza-v-racing-santander/34225116",
    },
    {
      fixture_id: "34225106",
      league: "Spanish Segunda",
      team_home: "CD Tenerife",
      team_away: "Cartagena FC",
      fixture_url:
        "https://m.skybet.com/football/spanish-segunda/cd-tenerife-v-cartagena-fc/34225106",
    },
    {
      fixture_id: "34303292",
      league: "Swedish Allsvenskan",
      team_home: "Brommapojkarna",
      team_away: "GAIS",
      fixture_url:
        "https://m.skybet.com/football/swedish-allsvenskan/brommapojkarna-v-gais/34303292",
    },
    {
      fixture_id: "34353913",
      league: "Swedish Superettan",
      team_home: "Trelleborgs",
      team_away: "Örgryte IS",
      fixture_url:
        "https://m.skybet.com/football/swedish-superettan/trelleborgs-v-orgryte-is/34353913",
    },
    {
      fixture_id: "34354395",
      league: "Swedish Superettan",
      team_home: "GIF Sundsvall",
      team_away: "Degerfors IF",
      fixture_url:
        "https://m.skybet.com/football/swedish-superettan/gif-sundsvall-v-degerfors-if/34354395",
    },
    {
      fixture_id: "34354396",
      league: "Swedish Superettan",
      team_home: "Oddevold",
      team_away: "Östers IF",
      fixture_url:
        "https://m.skybet.com/football/swedish-superettan/oddevold-v-osters-if/34354396",
    },
    {
      fixture_id: "34360401",
      league: "Swiss Challenge League",
      team_home: "Aarau",
      team_away: "FC Vaduz",
      fixture_url:
        "https://m.skybet.com/football/swiss-challenge-league/aarau-v-fc-vaduz/34360401",
    },
    {
      fixture_id: "34360404",
      league: "Swiss Challenge League",
      team_home: "FC Wil 1900",
      team_away: "Stade-Lausanne-Ouchy",
      fixture_url:
        "https://m.skybet.com/football/swiss-challenge-league/fc-wil-1900-v-stade-lausanne-ouchy/34360404",
    },
    {
      fixture_id: "34349183",
      league: "Swiss Super League",
      team_home: "FC Luzern",
      team_away: "Lausanne-Sport",
      fixture_url:
        "https://m.skybet.com/football/swiss-super-league/fc-luzern-v-lausanne-sport/34349183",
    },
    {
      fixture_id: "34349190",
      league: "Swiss Super League",
      team_home: "Sion",
      team_away: "Yverdon Sport",
      fixture_url:
        "https://m.skybet.com/football/swiss-super-league/sion-v-yverdon-sport/34349190",
    },
    {
      fixture_id: "34349425",
      league: "Swiss Super League",
      team_home: "FC Winterthur",
      team_away: "Grasshoppers",
      fixture_url:
        "https://m.skybet.com/football/swiss-super-league/fc-winterthur-v-grasshoppers/34349425",
    },
    {
      fixture_id: "34338275",
      league: "Turkish Super Lig",
      team_home: "Hatayspor",
      team_away: "Trabzonspor",
      fixture_url:
        "https://m.skybet.com/football/turkish-super-lig/hatayspor-v-trabzonspor/34338275",
    },
    {
      fixture_id: "34338273",
      league: "Turkish Super Lig",
      team_home: "Istanbul Basaksehir FK",
      team_away: "Kayserispor",
      fixture_url:
        "https://m.skybet.com/football/turkish-super-lig/istanbul-basaksehir-fk-v-kayserispor/34338273",
    },
    {
      fixture_id: "33420667",
      league: "UEFA Nations League",
      team_home: "Latvia",
      team_away: "North Macedonia",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/latvia-v-north-macedonia/33420667",
    },
    {
      fixture_id: "33420625",
      league: "UEFA Nations League",
      team_home: "Moldova",
      team_away: "Andorra",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/moldova-v-andorra/33420625",
    },
    {
      fixture_id: "33420655",
      league: "UEFA Nations League",
      team_home: "Austria",
      team_away: "Kazakhstan",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/austria-v-kazakhstan/33420655",
    },
    {
      fixture_id: "33420653",
      league: "UEFA Nations League",
      team_home: "England",
      team_away: "Greece",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/england-v-greece/33420653",
    },
    {
      fixture_id: "33420692",
      league: "UEFA Nations League",
      team_home: "Faroe Islands",
      team_away: "Armenia",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/faroe-islands-v-armenia/33420692",
    },
    {
      fixture_id: "33420777",
      league: "UEFA Nations League",
      team_home: "Finland",
      team_away: "Rep of Ireland",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/finland-v-rep-of-ireland/33420777",
    },
    {
      fixture_id: "33420670",
      league: "UEFA Nations League",
      team_home: "Gibraltar",
      team_away: "San Marino",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/gibraltar-v-san-marino/33420670",
    },
    {
      fixture_id: "33420737",
      league: "UEFA Nations League",
      team_home: "Israel",
      team_away: "France",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/israel-v-france/33420737",
    },
    {
      fixture_id: "33420709",
      league: "UEFA Nations League",
      team_home: "Italy",
      team_away: "Belgium",
      fixture_url:
        "https://m.skybet.com/football/uefa-nations-league/italy-v-belgium/33420709",
    },
    {
      fixture_id: "34338295",
      league: "Uruguayan Primera Division",
      team_home: "Racing",
      team_away: "Cerro Largo FC",
      fixture_url:
        "https://m.skybet.com/football/uruguayan-primera-division/racing-v-cerro-largo-fc/34338295",
    },
    {
      fixture_id: "34338561",
      league: "Uruguayan Primera Division",
      team_home: "Danubio",
      team_away: "Defensor Sporting",
      fixture_url:
        "https://m.skybet.com/football/uruguayan-primera-division/danubio-v-defensor-sporting/34338561",
    },
    {
      fixture_id: "34338778",
      league: "Uruguayan Primera Division",
      team_home: "CA Boston River",
      team_away: "Montevideo Wanderers",
      fixture_url:
        "https://m.skybet.com/football/uruguayan-primera-division/ca-boston-river-v-montevideo-wanderers/34338778",
    },
    {
      fixture_id: "34303864",
      league: "USA MLS",
      team_home: "Toronto FC",
      team_away: "Inter Miami CF",
      fixture_url:
        "https://m.skybet.com/football/usa-mls/toronto-fc-v-inter-miami-cf/34303864",
    },
    {
      fixture_id: "34343177",
      league: "Women's Super League",
      team_home: "Manchester City Women",
      team_away: "West Ham United Women",
      fixture_url:
        "https://m.skybet.com/football/women-s-super-league/manchester-city-women-v-west-ham-united-women/34343177",
    },
    {
      fixture_id: "34343475",
      league: "Women's Super League",
      team_home: "Arsenal Women",
      team_away: "Everton Women",
      fixture_url:
        "https://m.skybet.com/football/women-s-super-league/arsenal-women-v-everton-women/34343475",
    },
    {
      fixture_id: "34343496",
      league: "Women's Super League",
      team_home: "Tottenham Hotspur Women",
      team_away: "Liverpool Women",
      fixture_url:
        "https://m.skybet.com/football/women-s-super-league/tottenham-hotspur-women-v-liverpool-women/34343496",
    },
    {
      fixture_id: "34343520",
      league: "Women's Super League",
      team_home: "Leicester City Women",
      team_away: "Crystal Palace Women",
      fixture_url:
        "https://m.skybet.com/football/women-s-super-league/leicester-city-women-v-crystal-palace-women/34343520",
    },
  ];

  // State for search, filters, pagination
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // to filter by league
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const leagues = [...new Set(data.map((item) => item.league))];

  // Search and filter logic
  const filteredItems = useMemo(() => {
    let filteredData = data;

    // Apply search filter
    if (filterValue) {
      filteredData = filteredData.filter(
        (item) =>
          item.team_home.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.team_away.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Apply league filter
    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.league === statusFilter
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter]);

  // Pagination logic
  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [page, rowsPerPage, filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  // Handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setPage(1); // reset to page 1 when searching
    },
    []
  );

  const handleLeagueChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(e.target.value);
      setPage(1); // reset to page 1 when filtering
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1); // reset to page 1 when rows per page change
    },
    []
  );

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 text-gray-600">
      <h1>Fixtures</h1>
      <div className="filters-wrapper grid grid-cols-12 gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by team..."
          value={filterValue}
          onChange={handleSearchChange}
          className="border p-2 rounded col-span-6"
        />

        {/* League filter */}
        <select
          value={statusFilter}
          onChange={handleLeagueChange}
          className="border p-2 rounded col-span-3"
        >
          <option value="all">All Leagues</option>
          {leagues.map((league, index) => (
            <option key={index} value={league}>
              {league}
            </option>
          ))}
        </select>

        {/* Rows per page */}
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border p-2 rounded col-span-3"
        >
          <option value="15">15 Rows</option>
          <option value="30">30 Rows</option>
          <option value="50">50 Rows</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>Fixture</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={index}>
                <td className="text-gray-700">{item.league}</td>
                <td className="text-gray-700">
                  {item.team_home} vs {item.team_away}
                </td>
                <td className="text-gray-700">24th September 13:00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper flex justify-between w-full">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
