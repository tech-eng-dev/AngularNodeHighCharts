import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/core/services/api.service';
import { take } from 'rxjs/operators';
import { Repositories } from 'src/app/core/models/repositories.model';
import { Repository } from 'src/app/core/models/repository.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  loading = false;
  languages = ['JavaScript', 'TypeScript', 'PHP', 'HTML', 'CSS'];
  language = this.languages[0];
  repoCount = 10;
  options: Highcharts.Options = {
    chart: {
      type: 'bar'
    }
  };
  chart: Highcharts.Chart;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.drawChart();
  }

  onChangeLanguage(language: string): void {
    this.language = language;
    this.drawChart();
  }

  onRepoCountChange(repoCount: number): void {
    this.repoCount = repoCount;
    this.drawChart();
  }

  private drawChart() {
    if (this.language && this.repoCount) {
      this.loading = true;
      this.apiService.fetchData(this.language, this.repoCount).pipe(
        take(1)
      ).subscribe((repos: Repositories) => {
        this.loading = false;
        const repoNames: string[] = [];
        const seriesData: any[] = [];
        repos?.results?.forEach((repo: Repository) => {
          repoNames.push(repo?.repository_name);
          seriesData.push({
            y: repo?.star_count,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
          });
        });

        this.chart = Highcharts.chart('container', this.options);
        this.chart.setTitle({text: `Top ${this.language} Repos`});
        this.chart.xAxis[0].setCategories(repoNames);
        this.chart.addSeries({
          name: 'Total Stars',
          data: seriesData,
          type: 'bar'
        });
      }, (error) => {
        console.log(error);
      });
    }
  }

}
