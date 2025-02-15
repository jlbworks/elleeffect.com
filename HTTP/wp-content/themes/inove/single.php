<?php get_header(); ?>
<?php $options = get_option('inove_options'); ?>

<?php if (have_posts()) : the_post(); update_post_caches($posts); ?>

	<div id="postpath">
		<a title="<?php _e('Goto homepage', 'inove'); ?>" href="<?php echo get_settings('home'); ?>/"><?php _e('Home', 'inove'); ?></a>
		 &gt; <?php the_category(', '); ?>
		 &gt; <?php the_title(); ?>
	</div>

	<div class="post" id="post-<?php the_ID(); ?>">
		<h2><?php the_title(); ?></h2>
		<div class="info">
			<span class="date"><?php the_time(__('F jS, Y', 'inove')) ?></span>
			<div class="act">
				<?php if ($comments || comments_open()) : ?>
					<span class="comments"><a href="#comments"><?php _e('Goto comments', 'inove'); ?></a></span>
					<span class="addcomment"><a href="#respond"><?php _e('Leave a comment', 'inove'); ?></a></span>
				<?php endif; ?>
				<?php edit_post_link(__('Edit', 'inove'), '<span class="editpost">', '</span>'); ?>
				<div class="fixed"></div>
			</div>
			<div class="fixed"></div>
		</div>
		<div class="content">
			<?php the_content(__('Read more...', 'inove')); ?>
			<p class="under">
				<?php if ($options['categories']) : ?><span class="categories"><?php the_category(', '); ?></span><?php endif; ?>
				<?php if ($options['tags']) : ?><span class="tags"><?php the_tags('', ', ', ''); ?></span><?php endif; ?>
			</p>
			<div class="fixed"></div>
		</div>
	</div>

<?php else : ?>
	<div class="errorbox">
		<?php _e('Sorry, no posts matched your criteria.', 'inove'); ?>
	</div>
<?php endif; ?>

<!-- related posts START -->
<?php
	// when related posts with title
	if(function_exists('wp23_related_posts')) {
		echo '<div id="related_posts">';
		wp23_related_posts();
		echo '</div>';
		echo '<div class="fixed"></div>';
	}
	/*
	// when related posts without title
	if(function_exists('wp23_related_posts')) {
		echo '<div class="boxcaption">';
		echo '<h3>Related Posts</h3>';
		echo '</div>';
		echo '<div id="related_posts" class="box">';
		wp23_related_posts();
		echo '</div>';
		echo '<div class="fixed"></div>';
	}
	*/
?>
<!-- related posts END -->

<?php comments_template(); ?>

<div id="postnavi">
	<span class="prev"><?php next_post_link('%link') ?></span>
	<span class="next"><?php previous_post_link('%link') ?></span>
	<div class="fixed"></div>
</div>

<?php get_footer(); ?>
