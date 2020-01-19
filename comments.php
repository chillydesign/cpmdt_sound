<?php if (have_comments()) : ?>
<?php wp_list_comments('type=comment&callback=webfactorcomments'); // Custom callback in functions.php ?>
<?php endif; ?>

