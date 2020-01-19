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

        <div class="video_container">
        
        

    <div id="player"></div>
        </div>


        <div class="playlists_container">
   
            <div class="columns">
                <div class="column">
                    <div class="playlist_container platlist_vid">
                        <div class="playlist_header">
                            <h3>Vidéos</h3>
                        </div>
                        <div class="playlist_videos" id="here" data-playlist="PLkLimRXN6NKwQr-G7JJsXXZOxtRaKYbv9">
                          
               
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="playlist_container playlist_sab">
                        <div class="playlist_header">
                            <h3>Sabliers</h3>
                        </div>
                        <div class="playlist_videos" data-playlist="PLNnta0sj2F9cokLGVFS_lML2ZSoWp-bNR">
                         
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="playlist_container playlist_ent">
                        <div class="playlist_header">
                            <h3>Entretiens</h3>
                        </div>
                        <div class="playlist_videos" data-playlist="PLV47y92aKN_PEy2u4XV0dTg2JrTdozu8X">
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
         
        <ul  class="comments_container">



        <?php  comments_template(); ?>


   

            </ul>





     

    </aside>

    <a id="menu_button">
        <svg id="menu_svg" [ngClass]="{white: sidebarVisible}" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 125" version="1.1" x="0px" y="0px">
            <g fill="#ffffff">
                <rect x="16" y="21" id="menu_bar_0" width="69" height="10" rx="5" />
                <rect x="16" y="45" id="menu_bar_1" width="69" height="10" rx="5" />
                <rect x="16" y="69" id="menu_bar_2" width="69" height="10" rx="5" />
            </g>
        </svg>
        <span>Menu</span>
    </a>

    <?php endwhile; endif; ?>


    <?php wp_footer(); ?>




<div class="explosion"></div>




</body>

</html>