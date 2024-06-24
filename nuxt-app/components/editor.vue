<template>
    <UCard>
      <template #header>
        <div v-if="editor" class="flex gap-2 items-center">
          <UButton  
          @click="editor.chain().focus().toggleBold().run()" 
          icon="i-material-symbols-format-bold-rounded" 
          :disabled="!editor.can().chain().focus().toggleBold().run()" 
          :variant="editor.isActive('bold') ? 'solid' : 'outline'" />
      <UButton
      icon="i-material-symbols-format-italic-rounded"
        @click="editor.chain().focus().toggleItalic().run()"
        :variant="editor.isActive('italic') ? 'solid' : 'outline'"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
      />
       
      <UButton
      icon="i-material-symbols-format-strikethrough-rounded"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :variant="editor.isActive('strike') ? 'solid' : 'outline'"
      />
      <USelectMenu v-model="sizeRef" :options="size" @change="changeSize" />
      <UButton
      icon="i-material-symbols-format-list-bulleted-rounded"
        @click="editor.chain().focus().toggleBulletList().run()"
        :variant="editor.isActive('bulletList') ? 'solid' : 'outline'"
      />
      <UButton
      icon="i-material-symbols-format-list-numbered-sharp"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :variant="editor.isActive('orderedList') ? 'solid' : 'outline'"
      />
    </div>

      </template>
      <TiptapEditorContent :editor="editor" />
    </UCard>
</template>
<script setup>
const model = defineModel()
const editor = useEditor({
  content: model.value,
  extensions: [TiptapStarterKit],
  onUpdate: () => {
    model.value = editor.value.getHTML()
      },
});

const size = ['paragraphe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const sizeRef = ref(size[0])
const changeSize = (e) => {
  const s = e[1]
  if(s == 'a') {
    editor.value.chain().focus().setParagraph().run()
  } else {
    editor.value.chain().focus().toggleHeading({ level: +s }).run()
  }
}

onBeforeUnmount(() => {
 unref(editor).destroy();
});
</script>