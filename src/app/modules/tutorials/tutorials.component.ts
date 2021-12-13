import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

  constructor() { }

  videos:any = [
    { author: 'Peter Fuller', description: 'How to Create Groups and Add Clients to Catipult', url: 'https://player.vimeo.com/video/578084472', tags: 'clients, groups' },
    { author: 'Peter Fuller', description: 'How to Navigate the First Steps of Catipult', url: 'https://player.vimeo.com/video/578088424', tags: 'onboarding' },
    { author: 'Peter Fuller', description: 'How to Set Up Your Organization in Catipult', url: 'https://player.vimeo.com/video/578089511', tags: 'organization' },
    { author: 'Peter Fuller', description: 'How to Create a KPI in the Catipult Dashboard', url: 'https://player.vimeo.com/video/578091568', tags: 'dashboard, kpis' },
    { author: 'Peter Fuller', description: 'How to Update KPIs in Catipult', url: 'https://player.vimeo.com/video/578095092', tags: 'kpis' },
    { author: 'Peter Fuller', description: 'How to Create a Rock in Catipult', url: 'https://player.vimeo.com/video/578096374', tags: 'rocks' },
    { author: 'Peter Fuller', description: 'How to Set Up Your Profile in Catipult', url: 'https://player.vimeo.com/video/578107127', tags: 'profile' },
    { author: 'Peter Fuller', description: 'How to Make Updates to Your Organization in Catipult', url: 'https://player.vimeo.com/video/578108027', tags: 'organization' },
    { author: 'Peter Fuller', description: 'How to Run Meetings in Catipult', url: 'https://player.vimeo.com/video/578111184', tags: 'meetings' },
    { author: 'Peter Fuller', description: 'How to See What the Team has Completed in Catipult', url: 'https://player.vimeo.com/video/578116601', tags: 'rocks' },
    { author: 'Peter Fuller', description: 'How to Interpret the Dashboard in Catipult', url: 'https://player.vimeo.com/video/578117192', tags: 'dashboard' },
    { author: 'Peter Fuller', description: 'How to Manage Your Billing in Catipult', url: 'https://player.vimeo.com/video/578118372', tags: 'billing' },
  ]

  videosFiltered:any = [];

  tags:string;

  ngOnInit() {
  }

  searchVideos(searchText:string):void {
    if (searchText==''){
      this.videosFiltered = [];
    }else {
      this.videosFiltered = [];
      for (const v in this.videos){
        if(this.videos[v].tags.includes(searchText.toLowerCase())){
          this.videosFiltered.push(this.videos[v]);
        }
      }    
    }
  }
}
