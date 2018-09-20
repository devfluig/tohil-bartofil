<table class="table table-striped with-border table-hover table-condensed">
	<thead>
  		<tr class="primary">
  			<th class="fs-txt-center">Seq Pessoa</th>
  			<th class="fs-txt-center">Tipo</th>
  			<th class="fs-txt-center">Ped Devolu&ccedil;&atilde;o</th>
  			<th class="fs-txt-center">Ped Venda 90</th>
  			<th class="fs-txt-center">Ped Fat Cruzado</th>
  			<th class="fs-txt-center">Produto</th>
  			<th>Descri&ccedil;&atilde;o</th>
  			<th class="fs-txt-center">Qtde</th>
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
	  			<td class="fs-txt-center">${row.seqpessoa}</td>
	  			<td class="fs-txt-center">${row.tipo}</td>
	  			<td class="fs-txt-center">${row.nropedvendaorigem}</td>
	  			<td class="fs-txt-center">${row.nropedant90}</td>
	  			<td class="fs-txt-center">${row.nrodocvenda}</td>
	  			<td class="fs-txt-center">${row.seqproduto}</td>
	  			<td>${row.desccompleta}</td>
	  			<td class="fs-txt-center">${row.qtdatendida}</td>
	  			<td>${row.desclocalidade}</td>
	  			<td>${row.pontos}</td>
	  		</tr>
		</#list>
  	</tbody>
</table>
