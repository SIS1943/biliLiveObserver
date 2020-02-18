<template>
    <div v-html="mdtext" class="markdown-body"></div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
export default {
    data() {
        return {
            mdtext: 'Document, Loading...'
        }
    },
    mounted(){
        axios.get('/lib/manual.md')
            .then((r)=>{
                this.mdtext = marked(r.data);
            })
    }
}
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css);
</style>