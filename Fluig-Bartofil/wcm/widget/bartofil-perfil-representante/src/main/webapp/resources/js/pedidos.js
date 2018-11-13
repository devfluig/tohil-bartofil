class Pedidos {

  constructor() {
  }

  get cgo() { return this._cgo; }
  set cgo(value) { this._cgo = value; }

  get codcliente() { return this._codcliente; }
  set codcliente(value) { this._codcliente = value; }
  
  get datainclusao() { return this._datainclusao; }
  set datainclusao(value) { this._datainclusao = value; }
  
  get descorigempedido() { return this._descorigempedido; }
  set descorigempedido(value) { this._descorigempedido = value; }
  
  get descparcelamento() { return this._descparcelamento; }
  set descparcelamento(value) { this._descparcelamento = value; }
  
  get diasuteisrestantes() { return this._diasuteisrestantes; }
  set diasuteisrestantes(value) { this._diasuteisrestantes = value; }
  
  get metavlrvenda() { return this._metavlrvenda; }
  set metavlrvenda(value) { this._metavlrvenda = value; }

  get motcancelamento() { return this._motcancelamento; }
  set motcancelamento(value) { this._motcancelamento = value; }

  get naturezaoperacao() { return this._naturezaoperacao; }
  set naturezaoperacao(value) { this._naturezaoperacao = value; }

  get nomecliente() { return this._nomecliente; }
  set nomecliente(value) { this._nomecliente = value; }

  get nropedidovenda() { return this._nropedidovenda; }
  set nropedidovenda(value) { this._nropedidovenda = value; }

  get origem() { return this._origem; }
  set origem(value) { this._origem = value; }

  get situacao() { return this._situacao; }
  set situacao(value) { this._situacao = value; }

  get valortotalacobrar() { return this._valortotalacobrar; }
  set valortotalacobrar(value) { this._valortotalacobrar = value; }

  get valortotalcomissao() { return this._valortotalcomissao; }
  set valortotalcomissao(value) { this._valortotalcomissao = value; }

  get valortotalpedido() { return this._valortotalpedido; }
  set valortotalpedido(value) { this._valortotalpedido = value; }

  get datafaturamento() { return this._datafaturamento; }
  set datafaturamento(value) { this._datafaturamento = value; }
  
  parse(obj) {
	  this._cgo = row["cgo"]; 
	  this._codcliente = row["codcliente"]; 
	  this._datainclusao = row["datainclusao"]; 
	  this._datafaturamento = row["datafaturamento"]; 
	  this._descorigempedido = row["descorigempedido"]; 
	  this._descparcelamento = row["descparcelamento"]; 
	  this._diasuteisrestantes = row["diasuteisrestantes"]; 
	  this._metavlrvenda = row["metavlrvenda"]; 
	  this._motcancelamento = row["motcancelamento"]; 
	  this._naturezaoperacao = row["naturezaoperacao"]; 
	  this._nomecliente = row["nomecliente"]; 
	  this._nropedidovenda = row["nropedidovenda"]; 
	  this._origem = row["origem"]; 
	  this._situacao = row["situacao"]; 
	  this._valortotalacobrar = row["valortotalacobrar"]; 
	  this._valortotalcomissao = row["valortotalcomissao"]; 
	  this._valortotalpedido = row["valortotalpedido"];
  }
  
}

const Situacao = {
    F: 'Faturamento',
    C: 'Cancelado',
    A: 'Em analise',
    D: 'Digitação',
    L: 'Liberado',
    R: 'Roteirização',
    S: 'Em separação',
    W: 'Em transito'
}

Object.freeze(Situacao);