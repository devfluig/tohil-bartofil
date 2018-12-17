<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
			<th class="fs-txt-left">Produto</th>
			<th class="fs-txt-right">Valor Faturado</th>
  		</tr>
  	</thead>
  	<tbody>
		<#list params['values'] as row>
			<tr> 
	  			<td class="fs-txt-left">${row.produto}</td>
	  			<td class="fs-txt-right">${row.valorFaturado}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
