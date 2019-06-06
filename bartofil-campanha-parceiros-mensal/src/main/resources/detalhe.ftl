<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
  			<th class="fs-txt-left">C&oacute;d. Cliente</th>
  			<th class="fs-txt-left">Tipo</th>
  			<th class="fs-txt-left">Ped Devolu&ccedil;&atilde;o</th>
  			<th class="fs-txt-left">Ped Venda 90</th>
  			<th class="fs-txt-left">Ped Fat Cruzado</th>
  			<th class="fs-txt-left">Produto</th>
  			<th>Descri&ccedil;&atilde;o</th>
  			<th class="fs-txt-left">Qtde</th>
  			<th>Localidade</th>
  			<th>Pontos</th>
  		</tr>
  	</thead>
  	<tbody>
		<#list params['values'] as row>
			<#if row.tipo == "Venda">
				<tr class='success'> 
	  		<#elseif row.tipo == "Devolucao">
				<tr class='danger'> 
			<#else> 
				<tr> 
			</#if>
	  			<td class="fs-txt-left">${row.seqpessoa}</td>
	  			<td class="fs-txt-left">${row.tipo}</td>
	  			<td class="fs-txt-left">${row.nropedvendaorigem}</td>
	  			<td class="fs-txt-left">${row.nropedant90}</td>
	  			<td class="fs-txt-left">${row.nrodocvenda}</td>
	  			<td class="fs-txt-left">${row.seqproduto}</td>
	  			<td>${row.desccompleta}</td>
	  			<td class="fs-txt-left">${row.qtdatendida}</td>
	  			<td>${row.desclocalidade}</td>
	  			<td>${row.pontos}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
