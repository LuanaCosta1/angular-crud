import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product!: Product;

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.service.readById(id).subscribe(product => { this.product = product });
    }
  }

  deleteProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.service.delete(id).subscribe(() => {
        this.service.showMessage("Produto excluído!");
        this.router.navigate(["/products"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

}
