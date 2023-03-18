<script lang="ts">
  import EasyMDE from "easymde";
  import "easymde/dist/easymde.min.css";

  import { onMount } from "svelte";

  let editorElement;

  // EasyMDE
  let autofocus = true;
  let previewImagesInEditor = true;
  let placeholder = "You're next masterpiece begins with, hello...";
  let height = "75vh";
  let scroll = true;
  let mde = null;
  let fullScreenOffset = null;
  let disabled = false;

  onMount(() => {
    height = height || "200px";
    mde = new EasyMDE({
      editorElement,
      autofocus: autofocus,
      previewImagesInEditor: previewImagesInEditor,
      placeholder: placeholder,
      autosave: {
        enabled: true,
        uniqueId: "MainEditor",
        delay: 1000,
        submit_delay: 5000,
        timeFormat: {
          locale: "en-US",
          format: {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          },
        },
        text: "Autosaved: ",
      },
      spellChecker: false,
      status: false,
      maxHeight: scroll ? height : undefined,
      minHeight: scroll ? undefined : height,
    });

    // Revert the editor when we unmount
    return () => {
      mde.toTextArea();
    };
  });
</script>

<textarea bind:this={editorElement} />
