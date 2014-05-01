<?php extend_template('default-nav'); ?>

<div class="col w-12 last">
	<div class="box">
		<h1><?=lang('sql_query_form_abbr')?></h1>
		<?=form_open(cp_url('utilities/query'), 'class="settings ajax-validate"')?>
			<?php $this->view('_shared/form_messages')?>
			<div class="alert inline warn">
				<?=lang('sql_warning')?>
			</div>
			<fieldset class="col-group">
				<div class="setting-txt col w-16">
					<h3><?=lang('common_queries')?></h3>
					<em><?=lang('common_queries_desc')?><br><a href="">SHOW STATUS</a>, <a href="">SHOW VARIABLES</a>, <a href="">SHOW PROCESSLIST</a></em>
				</div>
			</fieldset>
			<fieldset class="col-group <?=form_error_class('thequery')?>">
				<div class="setting-txt col w-16">
					<h3><?=lang('sql_query_to_run')?></h3>
				</div>
				<div class="setting-field col w-16 last">
					<textarea class="has-format-options" name="thequery" cols="" rows=""></textarea>
					<div class="format-options txt-left">
						<input type="checkbox" checked="checked" name="debug" value="y">
						<label><?=lang('enable_sql_errors')?></label>
					</div>
					<?=form_error('thequery')?>
				</div>
			</fieldset>

			<fieldset class="form-ctrls <?=form_error_class('password_auth')?>">
				<div class="password-req">
					<div class="setting-txt col w-8">
						<h3><?=lang('current_password')?> <span class="required" title="required field">&#10033;</span></h3>
						<em><?=lang('sql_password_desc')?></em>
					</div>
					<div class="setting-field col w-8 last">
						<input class="required" type="password" name="password_auth" value="">
						<?=form_error('password_auth')?>
					</div>
				</div>
				<?=cp_form_submit('query_btn', 'query_btn_working')?>
			</fieldset>
		</form>
	</div>
</div>