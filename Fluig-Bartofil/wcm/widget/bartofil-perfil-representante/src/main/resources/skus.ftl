<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
			<th class="fs-txt-center">Produto</th>
			<th class="fs-txt-center">Valor Faturado</th>
  		</tr>
  	</thead>
  	<tbody>
		<#list params['values'] as row>
			<tr> 
	  			<td class="fs-txt-center">${row.produto}</td>
	  			<td class="fs-txt-center">${row.valorFaturado}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
