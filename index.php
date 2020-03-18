<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php $tdu =  get_template_directory_uri(); ?>
    <?php $site_name = get_bloginfo('site_name'); ?>
    <title><?php echo $site_name; ?></title>
    <?php wp_head(); ?>


</head>

<body>



    <main class="page_container">





        <header>
            <a href="<?php echo home_url(); ?>" class="exploration">Exploration</a>

            <a href="<?php echo home_url(); ?>" class="branding"><?php echo $site_name; ?></a>

        </header>

        <?php if (have_posts()): while (have_posts()) : the_post(); ?>

        <?php $post_id = get_the_ID(); ?>

        <div class="video_container">
            <div id="player"></div>
        </div>


        <div id="playlists_container" class="playlists_container">

            <?php $playlist_1 = get_post_meta($post_id,'playlist_1', true); ?>
            <?php $playlist_1_title = get_post_meta($post_id,'playlist_1_title', true); ?>
            <?php $playlist_2 = get_post_meta($post_id,'playlist_2', true); ?>
            <?php $playlist_2_title = get_post_meta($post_id,'playlist_2_title', true); ?>
            <?php $playlist_3 = get_post_meta($post_id,'playlist_3', true); ?>
            <?php $playlist_3_title = get_post_meta($post_id,'playlist_3_title', true); ?>

            <div class="columns">
                <div class="column">
                    <div class="playlist_container" id="platlist_vid">
                        <div class="playlist_header">
                            <h3><?php echo $playlist_1_title; ?></h3>
                            <div class="scroll_link_container">
                                <a href="#playlist_sab" class="scroll_playlist next_playlist">Next</a>
                            </div>
                        </div>
                        <div class="playlist_videos" data-playlist="<?php echo $playlist_1; ?>">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="playlist_container" id="playlist_sab">
                        <div class="playlist_header">
                            <h3><?php echo $playlist_2_title; ?></h3>
                            <div class="scroll_link_container">
                                <a href="#playlist_ent" class="scroll_playlist next_playlist">Next</a>
                                <a href="#platlist_vid" class="scroll_playlist prev_playlist">Previous</a>
                            </div>
                        </div>
                        <div class="playlist_videos" data-playlist="<?php echo $playlist_2; ?>">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="playlist_container" id="playlist_ent">
                        <div class="playlist_header">
                            <h3><?php echo $playlist_3_title; ?></h3>
                            <div class="scroll_link_container">
                                <a href="#playlist_sab" class="scroll_playlist prev_playlist">Previous</a>
                            </div>
                        </div>
                        <div class="playlist_videos" data-playlist="<?php echo $playlist_3; ?>">
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </main>



    <aside id="aside">
        <br>
        <h2>Commentaires</h2>


        <?php comment_form(); ?>

        <ul class="comments_container" id="comments_container">
            <?php  comments_template(); ?>
        </ul>


    <script>
    var comment_info = {
        id: <?php echo get_the_ID(); ?>,
        rest_url: "<?php echo get_rest_url(); ?>",
        author_id: <?php echo get_current_user_id() ; ?>,
    };
    </script>

    </aside>

    <a id="menu_button">
        
        <svg  id="menu_svg" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 406 386.8" style="enable-background:new 0 0 406 386.8;" xml:space="preserve">
        <g fill="#ffffff">
            <path class="st0" d="M406,68v186c0,37-30,68-68,68h-21v52c0,10-10,16-19,11l-127-63H67c-37,0-67-31-67-68L0,68C0,30,30,0,67,0
                l271,0C376,0,406,30,406,68z M25,68v186c0,23,19,42,42,42h110l114,58v-58h47c24,0,43-19,43-42V68c0-24-19-43-43-43H67
                C44,25,25,44,25,68z"/>
            <path class="st0" d="M314,161c0,16-13,30-30,30c-16,0-30-14-30-30c0-17,14-30,30-30C301,131,314,144,314,161z M274,161
                c0,6,4,10,10,10s10-4,10-10s-4-10-10-10S274,155,274,161z"/>
            <path class="st0" d="M233,161c0,16-14,30-30,30c-17,0-30-14-30-30c0-17,13-30,30-30C219,131,233,144,233,161z M193,161
                c0,6,4,10,10,10c5,0,10-4,10-10s-5-10-10-10C197,151,193,155,193,161z"/>
            <path class="st0" d="M151,161c0,16-13,30-30,30c-16,0-29-14-29-30c0-17,13-30,29-30C138,131,151,144,151,161z M111,161
                c0,6,5,10,10,10c6,0,11-4,11-10s-5-10-11-10C116,151,111,155,111,161z"/>
        </g>
        </svg>


        <span>Menu</span>
    </a>

    <?php endwhile; endif; ?>


    <?php wp_footer(); ?>




    <div class="explosion"></div>




</body>

</html>