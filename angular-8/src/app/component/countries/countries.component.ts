import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, OnInit } from '@angular/core';
import { CountriesSerService } from '../../service/countries-ser.service';



@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit {
  public filteredData: any[] = [];

  constructor(
    private countService: CountriesSerService) { 
    
  }

  
  ngOnInit(): void {

    this.countService.getMultipleCountries().subscribe((data) => {
      console.log("after Service",data)
      data.forEach(element => {
        this.filteredData.push( { name: element.country,
                                children: [{
                                  name:'Active', value:element.active},
                                {name:'Death' ,value:element.deaths}, {name:'Recovered',value: element.recovered}
                              ] }
          );
      });
      this.createChart();
      console.log(this.filteredData, 'filteredData');
    });
   
  }

  public createChart(){
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // create chart
    var chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst);
    this.filteredData.forEach((item,i)=>{
      chart.data.push(item);
    })
   
    console.log(chart.data,"chart data ")
    chart.colors.step = 2;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(10);
    
    // define data fields
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    
    
    var level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
    level0SeriesTemplate.hiddenInLegend = false;
    chart.seriesTemplates.setKey("0", level0SeriesTemplate)
    
    // this makes labels to be hidden if they don't fit
    level0SeriesTemplate.labels.template.truncate = false;
    level0SeriesTemplate.labels.template.hideOversized = true;
    
    level0SeriesTemplate.labels.template.adapter.add("rotation", (rotation, target) => {
      target.maxWidth = target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
      target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);
    
      return rotation;
    })
    
    
    var level1SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey("1", level1SeriesTemplate)
    level1SeriesTemplate.fillOpacity = 0.75;
    level1SeriesTemplate.hiddenInLegend = true;
    
    
    var level2SeriesTemplate = level0SeriesTemplate.clone();
    chart.seriesTemplates.setKey("2", level2SeriesTemplate)
    level2SeriesTemplate.fillOpacity = 0.5;
    level2SeriesTemplate.hiddenInLegend = true;
    
    chart.legend = new am4charts.Legend();

}
}
