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

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\BlendMaxMayaPlugin\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'page#do_echo', 'url' => '/echo', 'verb' => 'POST'],
        ['name' => 'job#create_job', 'url' => '/job', 'verb' => 'POST'],
        ['name' => 'job#find_folder', 'url' => '/find', 'verb' => 'POST']
    ]
];