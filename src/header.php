<?php
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="An attemt to build a WordPress theme using WP-Rest and based upon Web Components">
    <meta name="theme-color" content="white"/>
    <link rel="manifest" href="<?= getManifestPath(); ?>">
    <style>
    <?php
        do_action('header_inline_css');
    ?>
    </style>
    <script type="module" src="<?= get_template_directory_uri(); ?>/index.mjs"></script>
    <script type="text/javascript" src="<?= get_template_directory_uri(); ?>/custom-elements.min.js" nomodule defer></script>
    <script type="text/javascript" src="<?= get_template_directory_uri(); ?>/legacy.js" nomodule defer></script>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>