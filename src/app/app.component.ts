import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from 'ng2-smart-table';
import { WineService } from 'src/app/services/wine.service';
import * as _ from 'lodash';
import { SelectEditorComponent } from 'ng2-smart-table/lib/components/cell/cell-editors/select-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate That Grape';
  wines: any;
  showTable = false;

  tableSettings = {
    columns: {
      name: {
        title: 'Wine Name',
        type: 'text'
      },
      year: {
        title: 'Wine Year',
        type: 'text',
      },
      type: {
        title: 'Wine Type',
        type: 'text',
        sort: false,
        filter: {
          type: 'list',
          config: {
            list: []
          }
        }
      },
      grapeType: {
        title: 'Grape Type',
        type: 'text',
        sort: false,
        filter: {
          type: 'list',
          config: {
            list: []
          }
        }
      },
      ratings: {
        title: 'Ratings',
        type: 'text',
        filter: {
          type: 'list',
          config: {
            list: []
          }
        }
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 15
    }
  };

  constructor(private wineService: WineService) {

  }

  ngOnInit() {
    this.getWines();
  }

  getWines() {
    this.wineService.getAll()
      .subscribe(
        data => {
          this.wines = new LocalDataSource(data);
          let wineTypes = _.uniqBy(data, 'type');
          wineTypes.forEach(w => {
            this.tableSettings.columns.type.filter.config.list.push({
              value: w['type'],
              title: w['type']
            })
          });
          let grapeTypes = _.uniqBy(data, 'grapeType');
          grapeTypes.forEach(w => {
            this.tableSettings.columns.grapeType.filter.config.list.push({
              value: w['grapeType'],
              title: w['grapeType']
            })
          });

          let ratings = [];
          _.map(data, data => {
            data['ratings'].forEach(el => {
              ratings.push(el.toString());
            });;
          });
          ratings = _.uniq(ratings).sort();
          console.log(ratings);
          ratings.forEach(w => {
            this.tableSettings.columns.ratings.filter.config.list.push({
              value: w,
              title: w
            })
          });

          this.showTable = true;
          console.log(this.wines);
        }
      )
  }
}
