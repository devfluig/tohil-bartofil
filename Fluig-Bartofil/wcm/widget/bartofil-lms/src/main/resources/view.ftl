<div id="lms_${instanceId}" class="super-widget wcm-widget-class widget-lms"
	data-params="lms.instance({instanceId: ${instanceId}})">

	<section id="content" class="content-container public-courses">
		<section class="courses row" id="list-courses">
			<section class="row">
				<div class="row top-page white-text cf flex">
					<div class="col m6 s12">
						<img
							src="http://www.bartofil.com.br/site/empresas/bartofil/images/Logo_Bartofil.png"
							width="200px" class="left">
							<h2 style="margin-top: 5px;">ACADEMY</h2>
					</div>
					<div class="col offset-m3 m3 s12">
						<div class="search-wrapper card">
							<form wrapper="materialize_vertical_form" action="/search" accept-charset="UTF-8" method="get">
								<input name="utf8" type="hidden" value="✓">
								<input id="search" name="q" placeholder="Pesquisar">
								<i class="material-icons">search</i>
							</form>
						</div>
					</div>
				</div>
			</section>
			<ul class="collection with-header list-categories col m2 s12" id="list-categories">
				<li class="active collection-item">
					<a href="#" data-click-category data-id="all">Todas as categorias</a>
				</li>
			</ul>

			<script type="text/template" class="tpl-categories">
				<li class="collection-item">
					<a href="#" data-click-category data-id="{{id}}">{{label}}</a>
				</li>
			</script>

			<section class="course-list col m10 s12">
				<div class="col s12 course-list" id="course-list"></div>
			</section>
		</section>
	</section>
	<script type="text/template" class="tpl-training">
		<div class="col l3 m6 s12 course course-free training-parent-{{parent}} card gtm-event grey-text">
			<div class="image-wrapper card-image">
  				<img class="col s12 course-logo responsive-img" src="{{img}}">
			</div>
			<div class="div-rainbow"></div>
			<div class="card-content">
  				<h4 class="title card-title" title="{{title}}">{{title}}</h4>
				<p class="">{{description}}</p>
		    </div>
			<div class="card-action cf">
    			<div class="price-container col center s12 btn-training-{{id}}">
        			{{{btn}}}
    			</div>
			</div>
		</div>
	</script>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

