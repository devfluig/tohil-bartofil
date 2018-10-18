<div class="panel panel-info">
   	<div class="panel-heading">CONDI&Ccedil;&Atilde;O DE PAGAMENTO</div>
   	<div class="panel-body">
		<table class="table table-striped with-border table-hover table-condensed">
			<thead>
		  		<tr class="primary">
		  			<th class="fs-txt-center">Parcela</th>
		  			<th class="fs-txt-center">Prazo</th>
		  			<th class="fs-txt-center">Valor</th>
		  		</tr>
		  	</thead>
		  	<tbody>
				<#list params['condicoes'] as row>
					<tr> 
			  			<td class="fs-txt-center">${row.nroparcela}</td>
			  			<td class="fs-txt-center">${row.prazo}</td>
			  			<td class="fs-txt-center">${row.valorparcela}</td>
			  		</tr>
				</#list>
		  	</tbody>
		</table>
   	</div>
</div>
<div class="panel panel-info">
   	<div class="panel-heading">ITEMS DO PEDIDO</div>
   	<div class="panel-body">
		<table class="table table-striped with-border table-hover table-condensed">
			<thead>
		  		<tr class="primary">
		  			<th class="fs-txt-center">Seq</th>
		  			<th>Produto</th>
		  			<th class="fs-txt-center">Qtde Pedida</th>
		  			<th class="fs-txt-center">Qtde Atend</th>
		  			<th class="fs-txt-center">Valor Pedido</th>
		  			<th class="fs-txt-center">Valor Atend</th>
		  			<th class="fs-txt-center">Comiss&atilde;o</th>
		  			<th class="fs-txt-center">Valor Total</th>
		  		</tr>
		  	</thead>
		  	<tbody>
				<#list params['items'] as row>
					<tr> 
			  			<td class="fs-txt-center">${row.seqitem}</td>
			  			<td>${row.codproduto} - ${row.descproduto}</td>
			  			<td class="fs-txt-center">${row.qtdpedida}</td>
			  			<td class="fs-txt-center">${row.qtdatendida}</td>
			  			<td class="fs-txt-center">${row.valorpedido}</td>
			  			<td class="fs-txt-center">${row.valoratendido}</td>
			  			<td class="fs-txt-center">${row.valortotalcomissao}</td>
			  			<td class="fs-txt-center">${row.valortotalacobrar}</td>
			  		</tr>
				</#list>
		  	</tbody>
		</table>
   	</div>
</div>
