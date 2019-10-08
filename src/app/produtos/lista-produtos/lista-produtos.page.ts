import { CarrinhoService } from './../../pedidos/shared/carrinho.service';
import { ProdutosService } from './../shared/produtos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  [x: string]: any;
  produtos: Observable<any[]>;
  categorias: Observable<any[]>;
  categoriaSelecionada: string;
  carrinhoPossuiItens: boolean = false;

  constructor(private router:Router,
              private produtosService:ProdutosService,
              private carrinhoService:CarrinhoService) { }

  ngOnInit() {
    this.produtos = this.produtosService.getAll();
    //veja que this.produtosservice se refere ao produtoservice.ts e o correto seria uma class para o proprio
    this.categorias = this.produtosService.getcategoriasAll();
    this.carrinhoService.carrinhoPossuiItens().subscribe((existemItens: boolean)=>{
      this.carrinhoPossuiItens = existemItens;
    })
  }
  buscarProdutos(){
    this.produtos = this.produtosService.getAll(this.categoriaSelecionada);
  }

  adicionarProduto(produtoKey: string){
    this.router.navigate(['pedido/carrinho/novo-item', produtoKey]);
  }

}
