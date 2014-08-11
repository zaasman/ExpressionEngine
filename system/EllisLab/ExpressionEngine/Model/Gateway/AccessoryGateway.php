<?php
namespace EllisLab\ExpressionEngine\Model\Gateway;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Accessory Gateway
 *
 * A gateway to store data on Accessories installed in this instance of
 * ExpressionEngine.
 *
 * @package		ExpressionEngine
 * @subpackage	Core
 * @category	Model
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */
class AccessoryGateway extends RowDataGateway {
	protected static $_primary_key = 'accessory_id';
	protected static $_table_name = 'accessories';

	protected $accessory_id;
	protected $class;
	protected $member_groups;
	protected $controllers;
	protected $accessory_version;
}
