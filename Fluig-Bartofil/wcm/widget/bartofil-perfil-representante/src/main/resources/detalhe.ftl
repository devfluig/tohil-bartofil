<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
			<th class="fs-txt-center">Produto</th>
			<th class="fs-txt-center">Valor Faturado</th>
			<th class="fs-txt-center">Comiss&atilde;o Recebida (R$)</th>
			<th class="fs-txt-center">Comiss&atilde;o M&eacute;dia (%)</th>
  		</tr>
  	</thead>
  	<tbody>
		<#list params['values'] as row>
			<tr> 
	  			<td class="fs-txt-center">${row.produto}</td>
	  			<td class="fs-txt-center">${row.valorFaturado}</td>
	  			<td class="fs-txt-center">${row.comissaoRecebida}</td>
	  			<td class="fs-txt-center">${row.comissaoMedia}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
