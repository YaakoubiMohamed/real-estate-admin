import { Component, OnInit, ViewChild } from '@angular/core';
import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
   simplePieChart, donutChart, splineAreaChart, dashedLineChart
} from './data';
import { ChartType } from './apex.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { UserService } from '../../shared/services/user.service';
import { AnnonceService } from '../../shared/services/annonce.service';
import { PublicationService } from '../../shared/services/publication.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isVisible!: string;

  transactions!: Array<[]>;
  statData!: Array<[]>;
  OveviewChart!: ChartType;

  agents!: any[];
  publications!: any[];
  annonces: any[]=[];
  clients!: any[];


  isActive!: string;
  basicColumChart!: ChartType;
  columnlabelChart!: ChartType;
  annonceslength!: number;
  publicationslength!: number;
  clientslength!: number;
  agentslength!: number;
  villes: string[] = [];
  ville!: string[];
  j!: number;
  nbrs: number[] = [];
  barChart!: {
    chart: { height: number; type: string; toolbar: { show: boolean; }; }; plotOptions: { bar: { horizontal: boolean; }; }; dataLabels: { enabled: boolean; }; series: { data: number[]; }[]; colors: string[]; xaxis: {
      // tslint:disable-next-line: max-line-length
      categories: string[];
    }; grid: { borderColor: string; };
  };


  constructor(private modalService: NgbModal, private configService: ConfigService, private eventService: EventService,
    private userservice: UserService, private annoceservice: AnnonceService, private publicationservice: PublicationService) {
    this.fetchData();
  }

  ngOnInit() {


    this.userservice.getUsers().subscribe(data => {
      this.agents = data;
      this.clients = data;
      this.agents = this.agents.filter(user => user.grade == 'agent');
      this.agentslength = this.agents.length || 0;
      this.clients = this.clients.filter(user => user.grade == 'client');
      this.clientslength = this.clients.length || 0;
    });
    this.annoceservice.getAnnonces().subscribe(data => {
      this.annonces = data;
      this.annonces.forEach(element => {
        //console.log('ville',element.ville);
        this.villes.push(element.ville);
        this.ville =  [...new Set(this.villes)];
        for(let k = 0; k < this.ville.length; k++){
          let somme =0;
          for(let i = 0; i < this.villes.length; i++){
            if(this.villes[i] == this.ville[k]){
              somme++;
              this.nbrs[k] = somme;
            }
          }
          
        }
        console.log('nbrs',  Object.values(this.nbrs));
        console.log('villes',this.ville);
      });

      this.annonceslength = this.annonces.length || 0;
    });
    this.publicationservice.getPublications().subscribe(data => {
      this.publications = data;
      this.publicationslength = this.publications.length || 0;
    });

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');

     this.isVisible = attribute || '';
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
         console.log(horizontal);
       }
     }

    /**
     * Fetches the data
     */
    this.fetchData();
  }


  ngAfterViewInit() {
    
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.basicColumChart = basicColumChart;
    this.columnlabelChart = columnlabelChart;
    this.barChart = {
      chart: {
          height: 350,
          type: 'bar',
          toolbar: {
              show: false
          }
      },
      plotOptions: {
          bar: {
              horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      series: [{
        data: this.nbrs
    }],
      colors: ['#34c38f'],
      xaxis: {
          // tslint:disable-next-line: max-line-length
          categories: ['Tunis', 'Ariana', 'Sousse', 'Sfax'],
      },
      grid: {
          borderColor: '#f1f1f1'
      },
  };

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }




  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }


}
