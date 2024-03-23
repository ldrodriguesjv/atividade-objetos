//instância para chamar o prompt no javascript
const entrada = require('prompt-sync')({sigint:true});
//instância para chamar o banco sqlite3
const sqlite3= require('sqlite3').verbose();

const fs=require('fs');
//criando o banco de dados
const db = new sqlite3.Database('dbVendas.db');

//verificando se exixte o banco de dados no local
const filePath='./dbVendas.db';
if (!fs.existsSync(filePath)){
        db.run('CREATE TABLE clientes (id INTEGER, nome TEXT, email TEXT, idade INTEGER)');
        db.run('CREATE TABLE produtos (id INTEGER, produto TEXT, estoque INTEGER, valor_unit INTEGER)');
        db.run('CREATE TABLE vendas (id INTEGER,nome_cliente TEXT, nome_prod TEXT, qtd_venda INTEGER,valor_total INTEGER, dt_venda TEXT)');

}
let listaProd = Array();
let continuar = 'Y';
let contVenda = 'Y'; 
let pIdClienteV;
let pIdProdutoV;
// variaveis para cadastrar o clientes
let pNomeCliente=String;
let pEmailCliente=String;
let pIdadeCliente=Number;

//variaveis para cadastrar produtos
let pNomeProduto=String;
let pEstoqueProduto=String;
let pValorProduto=Number;

//variaveis para cadastrar vendas
let pNomeClienteVenda = String;
let pNomeProdutoVenda = String;
let pQTDVenda = Number;
let pValorTVenda = Number;
let pDataVenda = String;

// função para inserir os dados na tabela clientes---------------------------------------------------
function fCadastroCliente(vnome, vemail, vidade) {
        // Consulta para obter o máximo ID da tabela 'usuarios'
        db.get("SELECT MAX(id) AS maxId FROM clientes", (err, row) => {
          if (err) {
            console.log(err);
            return;
          }
          
          // Extrai o máximo ID retornado da consulta
          let maxId = row.maxId || 1; // Se não houver resultados, define maxId como 1
      
          // Incrementa o máximo ID para obter o próximo ID para o novo cliente
          let newId = maxId + 1;
      
          // Valores para inserir na tabela 'cliente'
          let vNomeCliente = vnome;
          let vEmailCliente = vemail;
          let vIdadeCliente = vidade;
      
          // Executa a inserção na tabela 'cliente'
          db.run(
            "INSERT INTO clientes (id, nome, email, idade) VALUES (?, ?, ?, ?)",
            [newId, vNomeCliente, vEmailCliente, vIdadeCliente],
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
              //alert("Cliente inserido com sucesso!");
            }
          );
        });
      }
//-------------------------------------------------------------------------------------------------------

// função para inserir os dados na tabela produtos----------------------------------------------------------
      function fCadastroProdutos(vproduto, vestoque, vvalor) {
        // Consulta para obter o máximo ID da tabela 'usuarios'
        db.get("SELECT MAX(id) AS maxIdProd FROM produtos", (err, row) => {
          if (err) {
            console.log(err);
            return;
          }
          // Extrai o máximo ID retornado da consulta
          let maxIdProd = row.maxIdProd || 1; // Se não houver resultados, define maxId como 1
          // Incrementa o máximo ID para obter o próximo ID para o novo cliente
          let newIdProd = maxIdProd + 1;
          // Valores para inserir na tabela 'cliente'
          let vProdutos = vproduto;
          let vEstoques = vestoque;
          let vValores = vvalor;
      
          // Executa a inserção na tabela 'cliente'
          db.run(
            "INSERT INTO produtos (id, produto, estoque, valor_unit) VALUES (?, ?, ?, ?)",
            [newIdProd, vProdutos, vEstoques, vValores],
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
              //alert("Produto inserido com sucesso!");
            }
          );
        });
      }
//-------------------------------------------------------------------------------------------------------
//
// função para inserir os dados na tabela vendas---------------------------------------------------------
  function fCadastroVendas(vnomevendacliente, cnomevendaprod,vqtd, vtotal, vdata) {
        // Consulta para obter o máximo ID da tabela 'usuarios'
        db.get("SELECT MAX(id) AS maxIdVenda FROM vendas", (err, row) => {
          if (err) {
            console.log(err);
            return;
          }
          // Extrai o máximo ID retornado da consulta
          let maxIdVenda = row.maxIdVenda || 1; // Se não houver resultados, define maxId como 1
          // Incrementa o máximo ID para obter o próximo ID para o novo cliente
          let newIdVenda = maxIdVenda + 1;
          // Valores para inserir na tabela 'cliente'
          let vNomeClienteVenda=vnomevendacliente;
          let vNomeProdutoVenda = cnomevendaprod;
          let vEstoquesVenda = vqtd;
          let vValoresVenda = vtotal;
          let vDataVenda = vdata;
      
          // Executa a inserção na tabela 'cliente'
          db.run(
            "INSERT INTO vendas (id ,nome_cliente, nome_prod, qtd_venda, valor_total, dt_venda) VALUES (?, ?, ?, ?, ?, ?)",
            [newIdVenda, vNomeClienteVenda, vNomeProdutoVenda, vEstoquesVenda, vValoresVenda,vDataVenda],
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
              //alert("Produto inserido com sucesso!");
            }
          );
        });
  }
//-----------------------------------------------------------------------------------------------------------

continuar=entrada("Deseja cadastrar novos clientes?(Y/N) ");

for(let i=0; continuar=="Y" || continuar=="y";){
  pNomeCliente=entrada("Digitar nome do cliente: ");
  pEmailCliente=entrada("Digitar email do cliente: ");
  pIdadeCliente=entrada("Digitar a idade do Cliente: ");
  fCadastroCliente(pNomeCliente,pEmailCliente,pIdadeCliente);
  continuar=entrada("Deseja continuar com cadastro de cliente?(Y/N)");
  i++;
};

continuar='Y';
continuar=entrada("Deseja cadastrar novos produtos?(Y/N) ");

for(let x=0; continuar=="Y" || continuar=="y";){
  pNomeProduto=entrada("Digitar nome do produto: ");  
  pEstoqueProduto=entrada("Digitar quantidade para estoque do produto: ");
  pValorProduto=entrada("Digitar o valor de venda do porduto: ");
  fCadastroProdutos(pNomeProduto,pEstoqueProduto,pValorProduto);
  continuar=entrada("Deseja continuar com cadastro de produto?(Y/N)");
  x++;
};

let data = new Date();
// Extrair o dia, mês e ano
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são zero indexados, então adicionamos 1
let ano = data.getFullYear();
// Formatar a data no formato dd/mm/aaaa
let dataFormatada = dia +'/'+ mes +'/' + ano;
//console.log(dataFormatada);

continuar=entrada('Deseja incluir a venda no carrinho?(Y/N) ');
let y=0;  
for(y=0; continuar=="Y" || continuar=="y";){
    pNomeClienteVenda = entrada("Digitar nome do cliente: ");
    pNomeProdutoVenda = entrada("Digitar nome do produto: ");
    pQTDVenda=entrada("Digitar a quantidade desejada do produto: ");
    db.each('SELECT valor_unit,estoque FROM produtos where produto=?',[pNomeProdutoVenda],function(err, row) {
      if (err) {
        console.log('Produto não localizado, tente novamente.');
      }else {
        if (pQTDVenda >= row.qtd_venda) {
          console.log('Quantidade maior que o estoque, tente novamente.') 
        }else{
          let pQtdprod = row.valor_unit;
          let pValorTVenda=pQtdprod * pQTDVenda;
          console.log(pValorTVenda);
        }       
      }
    });
    pDataVenda = dataFormatada;
    fCadastroVendas(pNomeClienteVenda,pNomeProdutoVenda,pQTDVenda,pValorTVenda,pDataVenda);
    continuar=entrada('Deseja continuar com a venda?(Y/N) ');
    y++;
  }

  db.close();

if (y=0){
  console.log('Vendas não realizadas.');
}else{ 
  db.each('SELECT sum(valor_total) as Vendas_Total FROM vendas where dt_venda=?', [dataFormatada],function(err, row) {
    if (err) {
      console.log('Venda não localizada para o dia '+ dataFormatada);
    }else {
    console.log('Total de Venda é R$ '+ row.Vendas_Total + ' no dia '+ dataFormatada);
    }
  });
};  



