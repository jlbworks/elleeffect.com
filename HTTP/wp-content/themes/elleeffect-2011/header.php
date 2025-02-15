<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Starkers
 * @since Starkers 3.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 * We filter the output of wp_title() a bit -- see
	 * twentyten_filter_wp_title() in functions.php.
	 */
	wp_title( '|', true, 'right' );

	?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" charset="utf-8">
	var SITE_ROOT = "<?php bloginfo('siteurl'); ?>";
	var THEME_ROOT = "<?php bloginfo('template_url'); ?>";
	var GALLERIES_PATH = "<?php bloginfo('siteurl'); ?>/wp-content/plugins/elle-gallery-xml/galleries.php";
</script>
<?php
	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	wp_enqueue_script( 'application' );

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>

<body <?php body_class(); ?>>
	<div id="container">
  	<div id="header"><div id="header-inner">
  		<h1>
  			<a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
  		</h1>
  		<p><?php bloginfo( 'description' ); ?></p>

		

  		<div id="access" role="navigation">
  		  <?php /*  Allow screen readers / text browsers to skip the navigation menu and get right to the good stuff */ ?>
  			<a href="#body" title="<?php esc_attr_e( 'Skip to content', 'twentyten' ); ?>"><?php _e( 'Skip to content', 'twentyten' ); ?></a>

  			<?php /* The galleries portion of the nav.   */ ?>
  			<?php 
  			wp_nav_menu( array(	'theme_location' => 'gallery_nav', 
  										// 'sort_column' => 'menu_order', 
  										// 'container_class' => 'main_nav', 
  										// 'menu_class' => 'main_nav_menu', 
  										'fallback_cb' => 'get_gallery_nav' 
  										) );
  			?>
			
  			<?php 
  			/* 	
  				Our navigation menu.  If one isn't filled out, wp_nav_menu falls back to wp_page_menu.  
  				The menu assiged to the primary position is the one used.  If none is assigned, the menu 
  				with the lowest ID is used.  
  			*/ 
  			?>
  			<?php  wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) ); ?>
			
  		</div><!-- #access -->
  	</div></div>