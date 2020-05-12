import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  DataArr: any = [];
  config: any;

  constructor(private myHttpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 9,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);

  }

  ngOnInit() {
    this.getItems()
  }


  getItems() {
    this.myHttpClient.get('https://raw.githubusercontent.com/stockholmux/ecommerce-sample-set/master/items.json').subscribe((resp: any) => {
      this.DataArr = resp
    })
  }

  pageChange(newPage: number) {
    this.router.navigate(['home'], { queryParams: { page: newPage } });
  }
}
