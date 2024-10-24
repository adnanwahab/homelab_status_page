//goal of this file is to create a schema for the llama-artifact
//populate ~/Derp/* with 100GB each today. 
const schema = `
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| 1. actions                     | 1TB actions_logs - robots + human doing things (change world state)                                   |
| 2. catoons                     | 1TB - (youtube, talks) video mostly or pixels over time                                  |
| 3. comics                      | research papers, mango, books                                                                         |
| 4. embeddings                  | intermediate representation of a transformer                                        |
| 5. intermediate_representations| render passes of embeddings before sending to transformer, gpt, llm                                   |
| 6. logs                        | 1TB log = code executing -> std+stdout                                                                |
| 7. sensor_data                 | camera, sound, lidar, radar, satellites, neuralink, tactiles                        |
| 8. text                        |                     webPages |
`
// GOAL BY NOV 1 - make zed+observablheq prediction as good as cursor.sh 
const directories = [
  "actions", /// oct 21 - environement cam + roomba
  "cartoons",
  "comics",
  "intermediate_representation", //steps of llama transformations -- for artifact 
  "log",
  "sensor_data",
  "text_from_internet",
  "embeddings", // dont need yet - create on the fly - when needed for task
      //"dist", this is built by vite - archive of our app - which is simple - it sohuld go in archive of web 
    //"static_assets", ----------------- for web 
    //"readme.md",  ---- understand DERP ----------
   
];

  
  function cartoons() {
    //tv tropes - cross pollinate with  --- get LABELS for stories for robots to understand human commmunciation 
    //torrent
    // Implementation for cartoons
    const cartoons = ['onepiece', 'bleach', 'naruto',
                        "ghost-in-the-shell",


    "psycho-pass", "cowboy bebop",  "fmab", 
    //gintama - humor fn
    ]
    // use llama to serach for torrents from nyaa -> get the favroite one 
    //playwright / chrome extension = tool-call -  
    // add the torrent file to folder and transmission ->>>> auto downods - when thats done - stat the fodler and derp it 
    //use llama -> get labels for stories 
    
  const { execSync } = require('child_process');
  const { spawn } = require("child_process");

  function downloadYouTubePlaylist(playlistUrl) {
    try {
      // Use pytube to download the playlist
      execSync(`pytube-fix ${playlistUrl} -o ./cartoons`);
      console.log(`Downloaded playlist: ${playlistUrl}`);
    } catch (error) {
      console.error(`Error downloading playlist: ${playlistUrl}`, error);
    }
  }

  function downloadAllPlaylists() {
    const playlists = [
      'https://www.youtube.com/playlist?list=PL1A2CSdiySGIPxpSlgzsZiWDavYTAx61d',
      'https://www.youtube.com/playlist?list=PL1A2CSdiySGJ0T6L0I0yY0Y0Y0Y0Y0Y0Y',
      // Add more playlist URLs here
    ];

    playlists.forEach(playlistUrl => {
      downloadYouTubePlaylist(playlistUrl);
    });
  }

  downloadAllPlaylists();

  }
  //RESERACH ALBLEING TOOLS 
//SPLINE.DESIGN --- comment substractor - visualize - rank by priotiy - try to rebucket ones that make sen - dont rask one thats are ogod  -- sppech

  function comics() {
    //300gb 
    //torrent 
    // Implementation for comics
    const manga = ['onepiece', 'bleach', 'naruto']
    const web_commics = ['phd_comics', 'qwantz', 'questionable_content', 'staircas', 'bfcw']

    /// most fun llama in the loop crawler -> inform diagrams a lot 

  }
  
  
  function intermediate_representation() {
    // Implementation for intermediate_representation
  }
  
  function log() {
    // Implementation for log
  }

  
  function sensor_data() {
    // Implementation for sensor_data
  }
  
  
  function text_from_internet() {
    //300GB
const prompt = `
given a list of 5,000 people from linkedin - find their github - get their list of stars and repos 

and also search if they have a blog or any research papers on arxiv


also use list of citations to parse a link graph - and grab useful datums 
`


    // Implementation for text_from_internet
    async function fetchGitHubProfiles(linkedInProfiles) {
      const githubProfiles = [];

      for (const profile of linkedInProfiles) {
        const githubProfile = await searchGitHub(profile);
        if (githubProfile) {
          githubProfiles.push(githubProfile);
        }
      }

      return githubProfiles;
    }

    async function searchGitHub(linkedInProfile) {
      // Implement the logic to search GitHub using the LinkedIn profile information
      // This could involve using GitHub's search API or scraping GitHub pages
      // For now, let's assume we have a function `getGitHubProfile` that does this
      return await getGitHubProfile(linkedInProfile);
    }

    async function getGitHubProfile(linkedInProfile) {
      // Placeholder function to simulate fetching GitHub profile
      // Replace this with actual implementation
      return {
        username: 'exampleUser',
        stars: ['repo1', 'repo2'],
        repos: ['repo1', 'repo2', 'repo3'],
        blog: 'https://example.com/blog',
        researchPapers: ['https://arxiv.org/abs/1234.5678']
      };
    }

    async function fetchBlogAndResearchPapers(githubProfiles) {
      for (const profile of githubProfiles) {
        const blog = await searchBlog(profile);
        const researchPapers = await searchResearchPapers(profile);
        profile.blog = blog;
        profile.researchPapers = researchPpapers;
      }
    }

    async function searchBlog(githubProfile) {
      // Implement the logic to search for a blog using the GitHub profile information
      // This could involve searching the web or using specific APIs
      // For now, let's assume we have a function `getBlog` that does this
      return await getBlog(githubProfile);
    }

    async function getBlog(githubProfile) {
      // Placeholder function to simulate fetching blog
      // Replace this with actual implementation
      return 'https://example.com/blog';
    }

    async function searchResearchPapers(githubProfile) {
      // Implement the logic to search for research papers on arXiv using the GitHub profile information
      // This could involve using arXiv's API or scraping arXiv pages
      // For now, let's assume we have a function `getResearchPapers` that does this
      return await getResearchPapers(githubProfile);
    }

    async function getResearchPapers(githubProfile) {
      // Placeholder function to simulate fetching research papers
      // Replace this with actual implementation
      return ['https://arxiv.org/abs/1234.5678'];
    }

    async function main() {
      const linkedInProfiles = ['profile1', 'profile2', 'profile3']; // Replace with actual LinkedIn profiles
      const githubProfiles = await fetchGitHubProfiles(linkedInProfiles);
      await fetchBlogAndResearchPapers(githubProfiles);
      console.log(githubProfiles);
    }

    main();

  }


  function embeddings() {
    // Implementation for embeddings
  }

function actions() {
    // Implementation for actions
  }
  

  const data_checkers = [
    actions,
    cartoons,
    comics,
    embeddings,
    intermediate_representation,
    log,
    sensor_data,
    text_from_internet
  ];


function main () {
    //data_checkers.forEach(checker => checker());    
    //evals.forEach(eval => eval());
    console.log("trained a simple robtoics foundation model for a mega man")
}


// deliverable  - zed predcition = emacs for LLAMA - simple text processing = LLM + tab prediction + keybind + 
//latency difference between cursor-AI and chatGPT and GPTAI and LLAMA on DEVICE ----100-20ms ---- still noticeable.
//BUT llama is more dependenable.



//simplest test -> run this file from bun/obs ->  output_json of trackers for cartoons, comics, and people_career_profiels
//