import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policy-graph',
  templateUrl: './policy-graph.component.html',
  styleUrls: ['./policy-graph.component.css'],
})
export class PolicyGraphComponent implements OnInit {

  regionValue = "All";
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: false,
    maintainAspectRatio: false 
  };

    public mbarChartLabels:string[] = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
    public barChartLegend:boolean = true;
  
    public barChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
    public barChartData:any[] = [
      // {data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A'},
    ];

//    months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']

    constructor(private policyService: PolicyService) { }

    ngOnInit(): void {
      this.getMonthlyData(this.regionValue)
    }

    //to get the monthly region wise data
    getMonthlyData(value: string) {
      this.policyService.getMonthlyPolicyData(value).subscribe(data => {
        this.populateGraph(data)
      },(error) => {
        console.log(error)
      })
    }

    //to update value of the graph
    populateGraph(data: any) {
      let newData: any = [];
      for(let i = 0; i<12; i++) {
        newData.push(0)
      }
      data.forEach((item: any) => {
        newData[item.month-1] = item.count
      })
      this.barChartData[0].data = newData;
    }

    regionSelected() {
      this.getMonthlyData(this.regionValue)
    }
  

}
