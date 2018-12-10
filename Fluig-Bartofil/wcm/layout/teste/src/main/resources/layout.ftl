
<#import "/wcm.ftl" as wcm/>
<@wcm.header />

<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">

	<@wcm.menu />

	<!-- Wrapper -->
	<div class="wcm-all-content">
		<div id="wcm-content" class="clearfix wcm-background">

			<#if pageRender.isEditMode()=true>
			<div name="formatBar" id="formatBar"></div>
			<div id="edicaoPagina" class="clearfix">
				<#else>
				<div id="visualizacaoPagina" class="clearfix">
					</#if>

					<!-- Slot 1 -->
					<div id="divSlot1" class="editable-slot slotfull layout-2-3left">
						<@wcm.renderSlot id="SlotA"
						editableSlot="true" />
					</div>

					<div id="all-slots-right">
						<!-- Slot 2 -->
						<div id="divSlot2" class="editable-slot slotfull layout-1-1">
							<@wcm.renderSlot id="SlotB"
							editableSlot="true" />
						</div>

						<!-- Slot 3 -->
						<div id="divSlot3" class="editable-slot slotfull layout-1-1">
							<@wcm.renderSlot id="SlotC"
							editableSlot="true" />
						</div>

						<!-- Slot 4 -->
						<div id="divSlot4" class="editable-slot slotfull layout-1-1">
							<@wcm.renderSlot id="SlotD"
							editableSlot="true" />
						</div>

						<!-- Slot 5 -->
						<div id="divSlot5" class="editable-slot slotfull layout-1-1">
							<@wcm.renderSlot id="SlotE"
							editableSlot="true" />
						</div>
					</div>

					<@wcm.footer layoutuserlabel="wcm.layoutdefaultpublic.user" />
				</div>
			</div>
		</div>
	</div>
</div>