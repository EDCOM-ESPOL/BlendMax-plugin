<?php
/**
 * ownCloud - blendmaxmayaplugin
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.

 * @author Kimberly Muñoz <kipamuno@espol.edu.ec>
 * @author Paul Valle <jpvalle@espol.edu.ec>
 * @copyright Edcom-Espol 2017
 */

namespace OCA\BlendMaxMayaPlugin\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

class PageController extends Controller {


	private $userId;

	public function __construct($AppName, IRequest $request, $UserId){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
	}

	/**
	 * CAUTION: the @Stuff turns off security checks; for this page no admin is
	 *          required and no CSRF check. If you don't know what CSRF is, read
	 *          it up in the docs or you might create a security hole. This is
	 *          basically the only required method to add this exemption, don't
	 *          add it to any other method if you don't exactly know what it does
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		$params = ['user' => $this->userId];
		return new TemplateResponse('blendmaxmayaplugin', 'main', $params);  // templates/main.php
	}

	/**
	 * Simply method that posts back the payload of the request
	 * @NoAdminRequired
	 */
	public function doEcho($scene,$frame_ini,$frame_fin) {
        
		return new DataResponse(['scene' => $scene, 'frame_ini'=>$frame_ini, 'frame_fin'=>$frame_fin]);
	}
    
}
