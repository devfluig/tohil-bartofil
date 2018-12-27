<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
			<th class="fs-txt-left">Produto</th>
			<th class="fs-txt-right">Valor Faturado</th>
			<th class="fs-txt-right">Comiss&atilde;o Recebida (R$)</th>
			<th class="fs-txt-right">Comiss&atilde;o M&eacute;dia (%)</th>
  		</tr>
  	</thead>
  	<tbody>
		<#list params['values'] as row>
			<tr> 
	  			<td class="fs-txt-left">${row.produto}</td>
	  			<td class="fs-txt-right">${row.valorFaturado}</td>
	  			<td class="fs-txt-right">${row.comissaoRecebida}</td>
	  			<td class="fs-txt-right">${row.comissaoMedia}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
