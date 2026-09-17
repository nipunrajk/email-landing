<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { site } from '@/config'
import Icon from '@/components/Icon.vue'
import BrandMark from '@/components/BrandMark.vue'

type Selection = 'none' | 'image' | 'heading' | 'text' | 'button' | 'columns' | 'divider' | 'social'
type TextKey = 'heading' | 'text'

const activeView = ref<'desktop' | 'mobile'>('desktop')
const activeTab = ref<'properties' | 'blocks'>('properties')
const selected = ref<Selection>('none')
const openMenu = ref<string | null>(null)

function toggleMenu(key: string) {
  openMenu.value = openMenu.value === key ? null : key
}

const FONT_OPTIONS = ['Plus Jakarta', 'Inter', 'Georgia', 'Courier New']
const SIZE_OPTIONS = ['12', '14', '15', '18', '22', '28']
// Mirrors the design-token palette so the mockup swatches match the real editor.
const SWATCHES = [
  '#0f1d28',
  '#5a6b78',
  '#6e44ff',
  '#a78bfa',
  '#2d6a4a',
  '#9a4527',
  '#dce4ea',
  '#ffffff',
]
const FONT_STACK: Record<string, string> = {
  'Plus Jakarta': 'var(--font-display)',
  Inter: 'var(--font-sans)',
  Georgia: 'Georgia, serif',
  'Courier New': '"Courier New", monospace',
}

interface TextFormat {
  font: string
  size: number
  bold: boolean
  italic: boolean
  underline: boolean
  strike: boolean
  link: boolean
  list: 'none' | 'bullet' | 'ordered'
  align: 'left' | 'center'
}

const formats = reactive<Record<TextKey, TextFormat>>({
  heading: {
    font: 'Plus Jakarta',
    size: 15,
    bold: true,
    italic: false,
    underline: false,
    strike: false,
    link: false,
    list: 'none',
    align: 'center',
  },
  text: {
    font: 'Plus Jakarta',
    size: 12,
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    link: false,
    list: 'none',
    align: 'center',
  },
})

const formatTarget = computed<TextKey>(() => (selected.value === 'text' ? 'text' : 'heading'))
const fmt = computed(() => formats[formatTarget.value])

function patchFormat(patch: Partial<TextFormat>) {
  Object.assign(formats[formatTarget.value], patch)
}

function toggleList(kind: 'bullet' | 'ordered') {
  patchFormat({ list: fmt.value.list === kind ? 'none' : kind })
}

function textClass(key: TextKey) {
  const f = formats[key]
  return [
    f.bold ? 'font-bold' : 'font-normal',
    f.italic ? 'italic' : '',
    f.underline ? 'underline' : '',
    f.strike ? 'line-through' : '',
    f.align === 'center' ? 'text-center' : 'text-left',
    f.link ? 'text-brand' : '',
  ]
}

function textStyle(key: TextKey) {
  const f = formats[key]
  return { fontFamily: FONT_STACK[f.font], fontSize: `${f.size}px` }
}

const emailStyles = reactive({
  canvasBg: '#edf1f4',
  emailBg: '#ffffff',
  textColor: '#5a6b78',
  brandColor: '#6e44ff',
  width: '600px',
  padding: '20px',
  containerIndex: 0,
})

const WIDTH_PX: Record<string, number> = { '480px': 440, '600px': 520, '720px': 600 }
const sheetWidth = computed(() => WIDTH_PX[emailStyles.width] ?? 520)

interface NavItem {
  label: string
  icon: string
  active?: boolean
  soon?: boolean
  count?: number
  badge?: string
  trailing?: boolean
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'layout-grid', trailing: true },
      { label: 'Project', icon: 'folder', count: 11 },
      { label: 'Email Builder', icon: 'mail', active: true },
      { label: 'Integrations', icon: 'sliders', soon: true },
    ],
  },
  {
    label: 'Import',
    items: [
      { label: 'Import from Figma', icon: 'import-down' },
      { label: 'Media Library', icon: 'image' },
    ],
  },
  {
    label: 'Test & Preview',
    items: [
      { label: 'Preview on Device', icon: 'mobile' },
      { label: 'Score Analyzer', icon: 'sparkle', badge: 'NEW' },
    ],
  },
]

const navFooter: NavItem[] = [
  { label: 'Trash', icon: 'trash', soon: true },
  { label: 'Settings', icon: 'settings' },
  { label: 'Support', icon: 'headphones' },
]

const blockLibrary: { name: string; icon: string; target: Exclude<Selection, 'none'> }[] = [
  { name: 'Text', icon: 'code', target: 'text' },
  { name: 'Image', icon: 'image', target: 'image' },
  { name: 'Button', icon: 'bolt', target: 'button' },
  { name: 'Columns', icon: 'layers', target: 'columns' },
  { name: 'Divider', icon: 'align-center', target: 'divider' },
  { name: 'Social', icon: 'users', target: 'social' },
]

const cornerDots = [
  '-top-1.5 -left-1.5',
  '-top-1.5 -right-1.5',
  '-bottom-1.5 -left-1.5',
  '-bottom-1.5 -right-1.5',
]

interface Row {
  label: string
  value?: string
  options?: string[]
  swatch?: string
  toggle?: string[]
  activeIndex?: number
  icon?: string
  trailingIcon?: string
  muted?: boolean
  readonly?: boolean
}

interface Section {
  title: string
  rows: Row[]
}

const blockSections = reactive<Record<Exclude<Selection, 'none'>, Section[]>>({
  image: [
    {
      title: 'Content',
      rows: [
        { label: 'Source', value: 'equinox-hero.jpg', readonly: true, muted: true },
        { label: 'Alt text', value: 'Autumn campaign', readonly: true },
      ],
    },
    {
      title: 'Image Sizing',
      rows: [
        { label: 'Width', value: '100%', options: ['50%', '75%', '100%'] },
        { label: 'Height', value: '160px', options: ['120px', '160px', '220px'] },
        { label: 'Radius', value: '8px', options: ['0px', '8px', '16px'] },
      ],
    },
  ],
  heading: [
    {
      title: 'Content',
      rows: [{ label: 'Text', value: 'Architectural knitwear', readonly: true }],
    },
    {
      title: 'Style',
      rows: [
        { label: 'Align', toggle: ['Center', 'Left'], activeIndex: 0 },
        { label: 'Padding', value: '16px 24px', options: ['8px 16px', '16px 24px', '24px 32px'] },
      ],
    },
  ],
  text: [
    {
      title: 'Content',
      rows: [{ label: 'Text', value: 'Crafted from deadstock…', readonly: true, muted: true }],
    },
    {
      title: 'Style',
      rows: [
        { label: 'Line height', value: '1.6em', options: ['1.4em', '1.6em', '1.8em'] },
        { label: 'Color', value: '5A6B78', swatch: '#5a6b78' },
      ],
    },
  ],
  button: [
    {
      title: 'Content',
      rows: [
        { label: 'Label', value: 'Shop the drop', readonly: true },
        { label: 'Link', value: 'noir.co/autumn', readonly: true, muted: true },
      ],
    },
    {
      title: 'Style',
      rows: [
        { label: 'Fill', value: '6E44FF', swatch: '#6e44ff' },
        { label: 'Radius', value: '8px', options: ['0px', '8px', '999px'] },
        { label: 'Width', toggle: ['Auto', 'Full'], activeIndex: 0 },
      ],
    },
  ],
  columns: [
    {
      title: 'Section',
      rows: [
        { label: 'Columns', value: '2', options: ['1', '2', '3'] },
        { label: 'Gap', value: '16px', options: ['8px', '16px', '24px'] },
      ],
    },
    {
      title: 'Style',
      rows: [
        { label: 'Padding', value: '0 20px', options: ['0', '0 20px', '0 32px'] },
        { label: 'Stack on', toggle: ['Mobile', 'Never'], activeIndex: 0 },
      ],
    },
  ],
  divider: [
    {
      title: 'Style',
      rows: [
        { label: 'Line', toggle: ['Solid', 'Dashed'], activeIndex: 0 },
        { label: 'Thickness', value: '1px', options: ['1px', '2px', '4px'] },
        { label: 'Color', value: 'DCE4EA', swatch: '#dce4ea' },
      ],
    },
    {
      title: 'Spacing',
      rows: [{ label: 'Margin', value: '16px', options: ['8px', '16px', '24px', '32px'] }],
    },
  ],
  social: [
    {
      title: 'Networks',
      rows: [
        { label: 'Icons', value: 'Instagram, X, Pinterest', readonly: true, muted: true },
        { label: 'Shape', toggle: ['Round', 'Square'], activeIndex: 0 },
      ],
    },
    {
      title: 'Style',
      rows: [
        { label: 'Size', value: '24px', options: ['20px', '24px', '32px'] },
        { label: 'Color', value: '5A6B78', swatch: '#5a6b78' },
      ],
    },
  ],
})

const labels: Record<Selection, string> = {
  none: 'Email Styles',
  image: 'Image',
  heading: 'Heading',
  text: 'Text',
  button: 'Button',
  columns: 'Columns',
  divider: 'Divider',
  social: 'Social',
}

const panelTitle = computed(() => labels[selected.value])
const activeSections = computed<Section[]>(() =>
  selected.value === 'none' ? [] : blockSections[selected.value],
)

const dividerStyle = computed(() => blockSections.divider[0].rows[0].activeIndex === 1)
const isFullBleed = computed(() => emailStyles.containerIndex === 1)
const heroPadding = computed(() => (isFullBleed.value ? '0px' : emailStyles.padding))

const canvasBgStyle = computed(() => ({
  backgroundColor: emailStyles.canvasBg,
  backgroundImage: 'radial-gradient(circle, var(--color-line-strong) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}))

const frameDims = computed(() => {
  const w = activeView.value === 'mobile' ? '280' : emailStyles.width.replace('px', '')
  return `${w} × 840 PX`
})

const selectionTags: Record<Exclude<Selection, 'none'>, string> = {
  image: 'IMAGE · 600×160',
  heading: 'HEADING · H1',
  text: 'TEXT · BODY',
  button: 'BUTTON · PRIMARY',
  columns: 'GRID · 2-COL',
  divider: 'DIVIDER · LINE',
  social: 'SOCIAL · ICONS',
}

function select(target: Selection) {
  selected.value = target
  openMenu.value = null
}

function selectFromLibrary(target: Exclude<Selection, 'none'>) {
  selected.value = selected.value === target ? 'none' : target
  openMenu.value = null
}

function ringClass(target: Selection) {
  return selected.value === target
    ? 'ring-2 ring-brand ring-offset-2'
    : 'transition-shadow duration-150 hover:ring-1 hover:ring-brand/40'
}

function chooseOption(row: Row, option: string) {
  row.value = option
  openMenu.value = null
}

function pickFont(font: string) {
  patchFormat({ font })
  openMenu.value = null
}

function pickSize(size: string) {
  patchFormat({ size: Number(size) })
  openMenu.value = null
}

function setGlobalFont(font: string) {
  formats.heading.font = font
  formats.text.font = font
  openMenu.value = null
}

function setColor(key: 'canvasBg' | 'emailBg' | 'textColor' | 'brandColor', color: string) {
  emailStyles[key] = color
  openMenu.value = null
}

function setWidth(width: string) {
  emailStyles.width = width
  openMenu.value = null
}

function setPadding(padding: string) {
  emailStyles.padding = padding
  openMenu.value = null
}

function chooseSwatch(row: Row, color: string) {
  row.swatch = color
  row.value = color.replace('#', '').toUpperCase()
  openMenu.value = null
}
</script>

<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-gradient-to-b from-brand/12 via-brand/4 to-transparent blur-3xl"
      aria-hidden="true"
    />

    <div
      class="mx-auto overflow-hidden rounded-2xl border border-line-strong bg-surface text-left shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_64px_-16px_rgba(15,29,40,0.22)] ring-1 ring-black/[0.04]"
    >
      <div v-if="openMenu" class="fixed inset-0 z-30" @click="openMenu = null" />

      <div class="flex h-8 shrink-0 items-center gap-1.5 border-b border-line bg-subtle/60 px-4">
        <span class="size-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
        <span class="size-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
        <span class="size-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10" />
      </div>

      <div class="flex">
      <aside class="hidden w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <div class="flex h-[72px] shrink-0 items-center gap-2.5 px-3.5">
          <BrandMark class="size-7" />
          <span class="font-display text-[15px] font-black tracking-[-0.03em] uppercase text-ink">{{ site.name }}</span>
          <span
            class="ml-auto grid size-6 place-items-center rounded-md border border-line bg-surface text-muted shadow-xs"
          >
            <Icon name="chevron-updown" class="size-3.5" />
          </span>
        </div>
        <div class="mx-3.5 h-px bg-line" />

        <div class="flex flex-1 flex-col px-3.5 pb-2">
          <div v-for="group in navGroups" :key="group.label">
            <p
              class="pt-4 pb-2 text-[10.5px] font-semibold tracking-[0.08em] text-muted/70 uppercase"
            >
              {{ group.label }}
            </p>
            <ul class="flex flex-col gap-0.5">
              <li v-for="item in group.items" :key="item.label" class="relative">
                <span
                  v-if="item.active"
                  class="absolute top-1/2 -left-3.5 z-10 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-brand"
                />
                <div
                  class="flex h-9 items-center gap-2.5 rounded-xl px-3 text-[13px]"
                  :class="
                    item.soon
                      ? 'text-muted/70'
                      : item.active
                        ? 'bg-tint font-semibold text-ink'
                        : 'font-medium text-ink/80'
                  "
                >
                  <Icon
                    :name="item.icon"
                    class="size-[18px] shrink-0"
                    :class="item.active ? 'text-brand' : 'text-muted'"
                  />
                  <span class="flex-1 truncate">{{ item.label }}</span>
                  <span
                    v-if="item.count"
                    class="grid size-[18px] place-items-center rounded-full bg-coral text-[10px] font-bold text-white"
                  >
                    {{ item.count }}
                  </span>
                  <span
                    v-else-if="item.badge"
                    class="rounded-full bg-tint px-1.5 py-0.5 text-[9.5px] font-bold text-brand"
                  >
                    {{ item.badge }}
                  </span>
                  <span v-else-if="item.soon" class="text-[10px] font-semibold">Soon</span>
                  <Icon
                    v-else-if="item.trailing"
                    name="chevron-right"
                    class="size-3.5 text-line-strong"
                  />
                </div>
              </li>
            </ul>
          </div>

          <ul class="mt-auto flex flex-col gap-0.5 pt-6">
            <li v-for="item in navFooter" :key="item.label">
              <div
                class="flex h-9 items-center gap-2.5 rounded-xl px-3 text-[13px]"
                :class="item.soon ? 'text-muted/70' : 'font-medium text-ink/80'"
              >
                <Icon :name="item.icon" class="size-[18px] shrink-0 text-muted" />
                <span class="flex-1 truncate">{{ item.label }}</span>
                <span v-if="item.soon" class="text-[10px] font-semibold">Soon</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="mx-3.5 h-px bg-line" />
        <div class="p-2">
          <div class="flex h-11 items-center gap-2.5 rounded-lg px-2">
            <span
              class="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-brand text-[13px] font-bold text-white"
            >
              N
            </span>
            <span class="min-w-0">
              <span class="block truncate text-[13px] font-semibold">Noir Studio</span>
              <span class="block truncate text-[11px] text-muted">studio@noir.co</span>
            </span>
          </div>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <header
          class="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 sm:px-5"
        >
          <nav class="flex min-w-0 items-center gap-1.5">
            <span class="hidden text-[13px] font-medium text-muted sm:inline">{{ site.name }}</span>
            <Icon name="chevron-right" class="hidden size-3.5 text-line-strong sm:inline" />
            <span class="hidden text-[13px] font-medium text-muted md:inline">Email Builder</span>
            <Icon name="chevron-right" class="hidden size-3.5 text-line-strong md:inline" />
            <span
              class="flex min-w-0 items-center gap-1.5 rounded-full bg-subtle px-3 py-1.5 text-[13px] font-semibold"
            >
              <span class="truncate">Autumn Equinox Drop</span>
              <Icon name="pencil" class="size-3 shrink-0 text-muted" />
            </span>
          </nav>

          <div class="flex shrink-0 items-center gap-2">
            <span
              class="hidden items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[12px] font-semibold text-mint ring-1 ring-mint/20 sm:flex"
            >
              <Icon name="check-circle" class="size-3.5" />
              Email Health
            </span>
            <span
              class="hidden size-8 place-items-center rounded-lg border border-line text-muted sm:grid"
            >
              <Icon name="settings" class="size-4" />
            </span>
            <span class="hidden h-5 w-px bg-line sm:block" />
            <span
              class="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[13px] font-semibold shadow-xs md:flex"
            >
              <Icon name="send" class="size-3.5" />
              Send Preview
            </span>
            <span
              class="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[13px] font-semibold shadow-xs"
            >
              <Icon name="download" class="size-3.5" />
              Export
            </span>
          </div>
        </header>

        <div class="flex min-w-0 flex-1">
          <div class="flex min-w-0 flex-1 flex-col">
            <div class="shrink-0 border-b border-line bg-surface px-4 pt-4 pb-3 sm:px-6">
              <div class="flex items-center gap-2">
                <h3 class="font-display text-[20px] font-bold tracking-[-0.02em]">
                  Autumn Equinox Drop
                </h3>
                <Icon name="pencil" class="size-3.5 text-muted" />
              </div>
              <p class="mt-0.5 text-[13px] text-muted">Subject: The drop lands at midnight</p>
            </div>

            <div
              class="relative z-20 flex h-11 shrink-0 items-center border-b border-line bg-surface px-4 sm:px-6"
            >
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-subtle hover:text-ink xl:grid"
              >
                <Icon name="undo" class="size-4" />
              </button>
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-subtle hover:text-ink xl:grid"
              >
                <Icon name="redo" class="size-4" />
              </button>
              <span class="mx-3 hidden h-5 w-px shrink-0 bg-line xl:block" />

              <div class="relative shrink-0">
                <button
                  type="button"
                  class="flex h-8 w-[120px] items-center justify-between rounded-lg bg-subtle px-2.5 text-xs font-medium transition-colors hover:bg-line/60 xl:w-[136px]"
                  @click="toggleMenu('font')"
                >
                  <span class="truncate">{{ fmt.font }}</span>
                  <Icon name="chevron-down" class="size-3.5 shrink-0 text-muted" />
                </button>
                <div
                  v-if="openMenu === 'font'"
                  class="absolute top-full left-0 z-40 mt-1 min-w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                >
                  <button
                    v-for="font in FONT_OPTIONS"
                    :key="font"
                    type="button"
                    class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] whitespace-nowrap transition-colors hover:bg-subtle"
                    :class="font === fmt.font ? 'font-semibold text-brand' : ''"
                    @click="pickFont(font)"
                  >
                    {{ font }}
                  </button>
                </div>
              </div>

              <div class="relative ml-2 shrink-0">
                <button
                  type="button"
                  class="flex h-8 w-16 items-center justify-between rounded-lg bg-subtle px-2.5 text-xs font-medium transition-colors hover:bg-line/60"
                  @click="toggleMenu('size')"
                >
                  {{ fmt.size }}
                  <Icon name="chevron-down" class="size-3.5 text-muted" />
                </button>
                <div
                  v-if="openMenu === 'size'"
                  class="absolute top-full left-0 z-40 mt-1 min-w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                >
                  <button
                    v-for="size in SIZE_OPTIONS"
                    :key="size"
                    type="button"
                    class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-subtle"
                    :class="Number(size) === fmt.size ? 'font-semibold text-brand' : ''"
                    @click="pickSize(size)"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <span class="mx-3 h-5 w-px shrink-0 bg-line" />

              <button
                type="button"
                class="grid size-7 shrink-0 place-items-center rounded-md text-[13px] font-bold transition-colors"
                :class="fmt.bold ? 'bg-tint text-brand' : 'hover:bg-subtle'"
                @click="patchFormat({ bold: !fmt.bold })"
              >
                B
              </button>
              <button
                type="button"
                class="grid size-7 shrink-0 place-items-center rounded-md text-[13px] italic transition-colors"
                :class="fmt.italic ? 'bg-tint text-brand' : 'hover:bg-subtle'"
                @click="patchFormat({ italic: !fmt.italic })"
              >
                I
              </button>
              <button
                type="button"
                class="grid size-7 shrink-0 place-items-center rounded-md text-[13px] underline transition-colors"
                :class="fmt.underline ? 'bg-tint text-brand' : 'hover:bg-subtle'"
                @click="patchFormat({ underline: !fmt.underline })"
              >
                U
              </button>
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md text-[13px] line-through transition-colors xl:grid"
                :class="fmt.strike ? 'bg-tint text-brand' : 'hover:bg-subtle'"
                @click="patchFormat({ strike: !fmt.strike })"
              >
                S
              </button>
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md transition-colors xl:grid"
                :class="fmt.link ? 'bg-tint text-brand' : 'text-muted hover:bg-subtle'"
                @click="patchFormat({ link: !fmt.link })"
              >
                <Icon name="link" class="size-4" />
              </button>

              <span class="mx-3 hidden h-5 w-px shrink-0 bg-line xl:block" />
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md transition-colors xl:grid"
                :class="fmt.list === 'bullet' ? 'bg-tint text-brand' : 'text-muted hover:bg-subtle'"
                @click="toggleList('bullet')"
              >
                <Icon name="list" class="size-4" />
              </button>
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md transition-colors xl:grid"
                :class="fmt.list === 'ordered' ? 'bg-tint text-brand' : 'text-muted hover:bg-subtle'"
                @click="toggleList('ordered')"
              >
                <Icon name="list-ordered" class="size-4" />
              </button>

              <span class="mx-3 hidden h-5 w-px shrink-0 bg-line xl:block" />
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md transition-colors xl:grid"
                :class="fmt.align === 'left' ? 'bg-tint text-brand' : 'text-muted hover:bg-subtle'"
                @click="patchFormat({ align: 'left' })"
              >
                <Icon name="align-left" class="size-4" />
              </button>
              <button
                type="button"
                class="hidden size-7 shrink-0 place-items-center rounded-md transition-colors xl:grid"
                :class="fmt.align === 'center' ? 'bg-tint text-brand' : 'text-muted hover:bg-subtle'"
                @click="patchFormat({ align: 'center' })"
              >
                <Icon name="align-center" class="size-4" />
              </button>

              <span class="ml-auto hidden shrink-0 pl-3 text-[11px] text-muted/70 xl:block">
                Editing {{ formatTarget === 'text' ? 'paragraph' : 'heading' }}
              </span>
            </div>

            <div
              class="relative flex-1 px-4 py-8 pb-20 transition-colors sm:px-8 sm:py-10 sm:pb-24"
              :style="canvasBgStyle"
            >
              <div
                class="mx-auto transition-all duration-300 ease-in-out"
                :style="{ maxWidth: activeView === 'mobile' ? '280px' : `${sheetWidth}px` }"
              >
                <p
                  class="mb-2 pl-0.5 font-mono text-[10px] tracking-wider text-muted/70 select-none"
                >
                  FRAME 12 · {{ frameDims }} · {{ isFullBleed ? 'FULL BLEED' : '100%' }}
                </p>

                <div
                  class="transition-all duration-300 ease-in-out"
                  :class="
                    activeView === 'mobile'
                      ? 'rounded-[24px] border-2 border-line shadow-xl'
                      : 'rounded-lg shadow-[0_24px_60px_-15px_rgba(15,29,40,0.18),0_4px_12px_-2px_rgba(15,29,40,0.06),0_0_0_1px_rgba(15,29,40,0.05)]'
                  "
                  :style="{ background: emailStyles.emailBg }"
                >
                <div v-if="activeView === 'mobile'" class="flex justify-center pt-2.5">
                  <span class="h-1.5 w-16 rounded-full bg-line-strong" />
                </div>

                <div class="flex items-center justify-between border-b border-line p-5">
                  <span class="flex items-center gap-2">
                    <span
                      class="grid size-6 place-items-center rounded bg-ink text-[11px] font-bold text-white"
                    >
                      N
                    </span>
                    <span class="text-[11px] font-bold tracking-[0.12em] uppercase">
                      Noir Studio
                    </span>
                  </span>
                  <span class="text-[11px] text-muted">View in browser</span>
                </div>

                <div class="transition-all duration-200" :style="{ padding: heroPadding }">
                  <button
                    type="button"
                    class="relative block w-full cursor-pointer"
                    @click="select('image')"
                  >
                    <span
                      class="relative block h-40 overflow-hidden bg-gradient-to-br from-[#2b3440] via-[#3d4a59] to-[#1d252e]"
                      :class="[ringClass('image'), isFullBleed ? '' : 'rounded-lg']"
                    >
                      <span class="absolute inset-x-0 bottom-0 p-4 text-left">
                        <span
                          class="block text-[10px] font-bold tracking-[0.14em] text-mint-soft uppercase"
                        >
                          Limited capsule
                        </span>
                        <span class="block font-display text-[18px] font-bold text-white">
                          Autumn Equinox Drop
                        </span>
                      </span>
                    </span>
                    <Transition name="select-fade">
                      <span v-if="selected === 'image'" class="pointer-events-none absolute inset-0">
                        <span
                          class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                        >
                          {{ selectionTags.image }}
                        </span>
                        <span
                          v-for="pos in cornerDots"
                          :key="pos"
                          class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                          :class="pos"
                        />
                      </span>
                    </Transition>
                  </button>
                </div>

                <button
                  type="button"
                  class="relative mx-5 block w-[calc(100%-2.5rem)] cursor-pointer rounded px-1 py-1"
                  :class="ringClass('heading')"
                  @click="select('heading')"
                >
                  <span class="block" :class="textClass('heading')" :style="textStyle('heading')">
                    <span v-if="formats.heading.list !== 'none'" class="mr-1">
                      {{ formats.heading.list === 'bullet' ? '•' : '1.' }}
                    </span>
                    Architectural knitwear &amp; outerwear
                  </span>
                  <Transition name="select-fade">
                    <span v-if="selected === 'heading'" class="pointer-events-none absolute inset-0">
                      <span
                        class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                      >
                        {{ selectionTags.heading }}
                      </span>
                      <span
                        v-for="pos in cornerDots"
                        :key="pos"
                        class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                        :class="pos"
                      />
                    </span>
                  </Transition>
                </button>

                <button
                  type="button"
                  class="relative mx-5 mt-1 block w-[calc(100%-2.5rem)] cursor-pointer rounded px-1 py-1"
                  :class="ringClass('text')"
                  @click="select('text')"
                >
                  <span
                    class="block leading-relaxed"
                    :class="textClass('text')"
                    :style="{ ...textStyle('text'), color: emailStyles.textColor }"
                  >
                    <span v-if="formats.text.list !== 'none'" class="mr-1">
                      {{ formats.text.list === 'bullet' ? '•' : '1.' }}
                    </span>
                    Crafted from sustainable deadstock merino. Built for weather that can’t make up
                    its mind.
                  </span>
                  <Transition name="select-fade">
                    <span v-if="selected === 'text'" class="pointer-events-none absolute inset-0">
                      <span
                        class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                      >
                        {{ selectionTags.text }}
                      </span>
                      <span
                        v-for="pos in cornerDots"
                        :key="pos"
                        class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                        :class="pos"
                      />
                    </span>
                  </Transition>
                </button>

                <div class="flex justify-center px-5 py-4">
                  <button
                    type="button"
                    class="relative cursor-pointer rounded-lg px-5 py-2.5 text-[12px] font-semibold text-white"
                    :class="ringClass('button')"
                    :style="{ background: emailStyles.brandColor }"
                    @click="select('button')"
                  >
                    Shop the drop
                    <Transition name="select-fade">
                      <span v-if="selected === 'button'" class="pointer-events-none absolute inset-0">
                        <span
                          class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                        >
                          {{ selectionTags.button }}
                        </span>
                        <span
                          v-for="pos in cornerDots"
                          :key="pos"
                          class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                          :class="pos"
                        />
                      </span>
                    </Transition>
                  </button>
                </div>

                <button
                  v-if="activeView === 'desktop'"
                  type="button"
                  class="relative grid w-full cursor-pointer grid-cols-2 gap-4 rounded-lg px-5 pb-5"
                  :class="ringClass('columns')"
                  @click="select('columns')"
                >
                  <span class="block rounded-lg border border-line p-3 text-center">
                    <span
                      class="mb-2 block h-20 rounded bg-gradient-to-br from-subtle to-[#e7eaf2]"
                    />
                    <span class="block text-[12px] font-bold">Merino Overcoat</span>
                    <span class="block text-[11px] text-muted">$320.00</span>
                  </span>
                  <span class="block rounded-lg border border-line p-3 text-center">
                    <span
                      class="mb-2 block h-20 rounded bg-gradient-to-br from-subtle to-[#e7eaf2]"
                    />
                    <span class="block text-[12px] font-bold">Ribbed Crewneck</span>
                    <span class="block text-[11px] text-muted">$185.00</span>
                  </span>
                  <Transition name="select-fade">
                    <span v-if="selected === 'columns'" class="pointer-events-none absolute inset-0">
                      <span
                        class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                      >
                        {{ selectionTags.columns }}
                      </span>
                      <span
                        v-for="pos in cornerDots"
                        :key="pos"
                        class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                        :class="pos"
                      />
                    </span>
                  </Transition>
                </button>
                <p v-else class="px-5 pb-5 text-center text-[11px] text-muted">
                  Merino Overcoat · Ribbed Crewneck
                </p>

                <button
                  type="button"
                  class="relative mx-5 block w-[calc(100%-2.5rem)] cursor-pointer py-2"
                  :class="ringClass('divider')"
                  @click="select('divider')"
                >
                  <span
                    class="block w-full border-line"
                    :class="dividerStyle ? 'border-t-2 border-dashed' : 'border-t'"
                  />
                  <Transition name="select-fade">
                    <span v-if="selected === 'divider'" class="pointer-events-none absolute inset-0">
                      <span
                        class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                      >
                        {{ selectionTags.divider }}
                      </span>
                      <span
                        v-for="pos in cornerDots"
                        :key="pos"
                        class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                        :class="pos"
                      />
                    </span>
                  </Transition>
                </button>

                <button
                  type="button"
                  class="relative mx-5 mt-1 flex w-[calc(100%-2.5rem)] cursor-pointer items-center justify-center gap-2 py-2"
                  :class="ringClass('social')"
                  @click="select('social')"
                >
                  <span
                    v-for="net in ['IG', 'X', 'PIN']"
                    :key="net"
                    class="grid size-6 place-items-center rounded-full bg-subtle text-[8px] font-bold text-muted"
                  >
                    {{ net }}
                  </span>
                  <Transition name="select-fade">
                    <span v-if="selected === 'social'" class="pointer-events-none absolute inset-0">
                      <span
                        class="pointer-events-none absolute -top-5 left-0 rounded-sm bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-xs"
                      >
                        {{ selectionTags.social }}
                      </span>
                      <span
                        v-for="pos in cornerDots"
                        :key="pos"
                        class="absolute size-2 rounded-[1.5px] border border-white bg-brand shadow-xs"
                        :class="pos"
                      />
                    </span>
                  </Transition>
                </button>

                <div
                  class="border-t border-line bg-subtle/60 p-4 text-center"
                  :class="activeView === 'mobile' ? 'rounded-b-[22px]' : 'rounded-b-lg'"
                >
                  <p class="text-[10px] text-muted">Unsubscribe · Preferences · Privacy</p>
                </div>
                </div>
              </div>

              <div class="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
                <div
                  class="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/70 bg-surface/85 px-2 py-1.5 backdrop-blur-xl shadow-[0_16px_36px_-6px_rgba(15,29,40,0.16),0_2px_8px_rgba(15,29,40,0.06)]"
                >
                  <div class="flex rounded-full bg-subtle/80 p-0.5">
                    <button
                      type="button"
                      class="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition-all"
                      :class="activeView === 'desktop' ? 'bg-ink text-white shadow-xs' : 'text-muted hover:text-ink'"
                      @click="activeView = 'desktop'"
                    >
                      <Icon name="desktop" class="size-3.5" />
                      <span class="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      type="button"
                      class="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition-all"
                      :class="activeView === 'mobile' ? 'bg-ink text-white shadow-xs' : 'text-muted hover:text-ink'"
                      @click="activeView = 'mobile'"
                    >
                      <Icon name="mobile" class="size-3.5" />
                      <span class="hidden sm:inline">Mobile</span>
                    </button>
                  </div>
                  <span class="mx-0.5 h-4 w-px bg-line" />
                  <span class="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-subtle/80 hover:text-ink">
                    <Icon name="moon" class="size-3.5" />
                  </span>
                  <span class="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-subtle/80 hover:text-ink">
                    <Icon name="ruler" class="size-3.5" />
                  </span>
                  <span class="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-subtle/80 hover:text-ink">
                    <Icon name="eye" class="size-3.5" />
                  </span>
                  <span class="mx-0.5 h-4 w-px bg-line" />
                  <span class="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-subtle/80 hover:text-ink">
                    <Icon name="trash" class="size-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside class="hidden w-[300px] shrink-0 flex-col border-l border-line bg-surface lg:flex">
            <div class="shrink-0 border-b border-line px-3.5 py-3">
              <div class="flex h-10 items-center rounded-xl border border-line bg-subtle p-1">
                <button
                  type="button"
                  class="flex h-8 flex-1 items-center justify-center rounded-lg text-[13px] transition-colors"
                  :class="
                    activeTab === 'properties'
                      ? 'bg-surface font-semibold text-ink shadow-xs'
                      : 'font-medium text-muted hover:text-ink'
                  "
                  @click="activeTab = 'properties'"
                >
                  Properties
                </button>
                <button
                  type="button"
                  class="flex h-8 flex-1 items-center justify-center rounded-lg text-[13px] transition-colors"
                  :class="
                    activeTab === 'blocks'
                      ? 'bg-surface font-semibold text-ink shadow-xs'
                      : 'font-medium text-muted hover:text-ink'
                  "
                  @click="activeTab = 'blocks'"
                >
                  Add Blocks
                </button>
              </div>
            </div>

            <Transition name="fade" mode="out-in">
              <div v-if="activeTab === 'blocks'" key="blocks" class="p-3.5">
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="block in blockLibrary"
                    :key="block.name"
                    type="button"
                    class="flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors"
                    :class="
                      selected === block.target
                        ? 'border-dashed border-brand bg-tint'
                        : 'border-line bg-surface hover:border-line-strong hover:bg-subtle/60'
                    "
                    @click="selectFromLibrary(block.target)"
                  >
                    <span
                      class="grid size-8 place-items-center rounded-lg transition-colors"
                      :class="
                        selected === block.target ? 'bg-brand text-white' : 'bg-subtle text-muted'
                      "
                    >
                      <Icon :name="block.icon" class="size-4" />
                    </span>
                    <span
                      class="text-[12px] font-medium"
                      :class="selected === block.target ? 'font-bold text-brand' : ''"
                    >
                      {{ block.name }}
                    </span>
                  </button>
                </div>
                <p class="mt-3 text-center text-[11px] text-muted/70">
                  Pick a block to inspect it on the canvas
                </p>
              </div>

              <div v-else key="properties">
                <div
                  class="flex shrink-0 items-center justify-between border-b border-line px-4 py-2.5"
                >
                  <h4 class="text-[13px] font-semibold">{{ panelTitle }}</h4>
                  <button
                    v-if="selected !== 'none'"
                    type="button"
                    class="text-[12px] font-medium text-brand transition-opacity hover:opacity-70"
                    @click="select('none')"
                  >
                    Deselect
                  </button>
                </div>

                <div v-if="selected === 'none'">
                  <div class="border-b border-line">
                    <p class="px-3 pt-3 pb-1 text-[13px] font-semibold">Canvas</p>
                    <div class="space-y-1.5 px-3 pb-3">
                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Canvas BG</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('canvasBg')"
                          >
                            <span
                              class="size-3.5 shrink-0 rounded border border-line-strong"
                              :style="{ background: emailStyles.canvasBg }"
                            />
                            <span class="flex-1 truncate text-left uppercase">
                              {{ emailStyles.canvasBg.replace('#', '') }}
                            </span>
                          </button>
                          <div
                            v-if="openMenu === 'canvasBg'"
                            class="absolute top-full right-0 z-40 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-2 shadow-lg"
                          >
                            <button
                              v-for="color in SWATCHES"
                              :key="color"
                              type="button"
                              class="size-5 rounded border border-line-strong"
                              :style="{ background: color }"
                              @click="setColor('canvasBg', color)"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Email BG</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('emailBg')"
                          >
                            <span
                              class="size-3.5 shrink-0 rounded border border-line-strong"
                              :style="{ background: emailStyles.emailBg }"
                            />
                            <span class="flex-1 truncate text-left uppercase">
                              {{ emailStyles.emailBg.replace('#', '') }}
                            </span>
                          </button>
                          <div
                            v-if="openMenu === 'emailBg'"
                            class="absolute top-full right-0 z-40 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-2 shadow-lg"
                          >
                            <button
                              v-for="color in SWATCHES"
                              :key="color"
                              type="button"
                              class="size-5 rounded border border-line-strong"
                              :style="{ background: color }"
                              @click="setColor('emailBg', color)"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">BG Image</span>
                        <span
                          class="flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px]"
                        >
                          <Icon name="image" class="size-3.5 shrink-0 text-muted" />
                          <span class="min-w-0 flex-1 truncate text-muted">
                            https://… (optional)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="border-b border-line">
                    <p class="px-3 pt-3 pb-1 text-[13px] font-semibold">Typography</p>
                    <div class="space-y-1.5 px-3 pb-3">
                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Font</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center justify-between rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('globalFont')"
                          >
                            <span class="truncate">{{ formats.heading.font }}</span>
                            <Icon name="chevron-down" class="size-3.5 shrink-0 text-muted" />
                          </button>
                          <div
                            v-if="openMenu === 'globalFont'"
                            class="absolute top-full left-0 z-40 mt-1 w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                          >
                            <button
                              v-for="font in FONT_OPTIONS"
                              :key="font"
                              type="button"
                              class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-subtle"
                              :class="font === formats.heading.font ? 'font-semibold text-brand' : ''"
                              @click="setGlobalFont(font)"
                            >
                              {{ font }}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Text</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('textColor')"
                          >
                            <span
                              class="size-3.5 shrink-0 rounded border border-line-strong"
                              :style="{ background: emailStyles.textColor }"
                            />
                            <span class="flex-1 truncate text-left uppercase">
                              {{ emailStyles.textColor.replace('#', '') }}
                            </span>
                          </button>
                          <div
                            v-if="openMenu === 'textColor'"
                            class="absolute top-full right-0 z-40 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-2 shadow-lg"
                          >
                            <button
                              v-for="color in SWATCHES"
                              :key="color"
                              type="button"
                              class="size-5 rounded border border-line-strong"
                              :style="{ background: color }"
                              @click="setColor('textColor', color)"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Brand</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('brandColor')"
                          >
                            <span
                              class="size-3.5 shrink-0 rounded border border-line-strong"
                              :style="{ background: emailStyles.brandColor }"
                            />
                            <span class="flex-1 truncate text-left uppercase">
                              {{ emailStyles.brandColor.replace('#', '') }}
                            </span>
                          </button>
                          <div
                            v-if="openMenu === 'brandColor'"
                            class="absolute top-full right-0 z-40 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-2 shadow-lg"
                          >
                            <button
                              v-for="color in SWATCHES"
                              :key="color"
                              type="button"
                              class="size-5 rounded border border-line-strong"
                              :style="{ background: color }"
                              @click="setColor('brandColor', color)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="border-b border-line">
                    <p class="px-3 pt-3 pb-1 text-[13px] font-semibold">Container</p>
                    <div class="space-y-1.5 px-3 pb-3">
                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Width</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center justify-between rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('width')"
                          >
                            {{ emailStyles.width }}
                            <Icon name="chevron-down" class="size-3.5 shrink-0 text-muted" />
                          </button>
                          <div
                            v-if="openMenu === 'width'"
                            class="absolute top-full left-0 z-40 mt-1 w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                          >
                            <button
                              v-for="w in ['480px', '600px', '720px']"
                              :key="w"
                              type="button"
                              class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-subtle"
                              :class="w === emailStyles.width ? 'font-semibold text-brand' : ''"
                              @click="setWidth(w)"
                            >
                              {{ w }}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Padding</span>
                        <div class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center justify-between rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu('padding')"
                          >
                            {{ emailStyles.padding }}
                            <Icon name="chevron-down" class="size-3.5 shrink-0 text-muted" />
                          </button>
                          <div
                            v-if="openMenu === 'padding'"
                            class="absolute top-full left-0 z-40 mt-1 w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                          >
                            <button
                              v-for="p in ['0px', '20px', '32px']"
                              :key="p"
                              type="button"
                              class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-subtle"
                              :class="p === emailStyles.padding ? 'font-semibold text-brand' : ''"
                              @click="setPadding(p)"
                            >
                              {{ p }}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Style</span>
                        <span
                          class="flex h-8 min-w-0 flex-1 items-center rounded-lg bg-subtle p-0.5"
                        >
                          <button
                            v-for="(opt, i) in ['Inset', 'Full bleed']"
                            :key="opt"
                            type="button"
                            class="flex h-7 flex-1 items-center justify-center rounded-md text-[12px] font-medium transition-colors"
                            :class="
                              emailStyles.containerIndex === i
                                ? 'bg-surface text-ink shadow-xs'
                                : 'text-muted'
                            "
                            @click="emailStyles.containerIndex = i"
                          >
                            {{ opt }}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="border-b border-line">
                    <p class="px-3 pt-3 pb-1 text-[13px] font-semibold">Personalization</p>
                    <div class="space-y-1.5 px-3 pb-3">
                      <div class="flex w-full min-w-0 items-center gap-3">
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">Fallbacks</span>
                        <span
                          class="flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px]"
                        >
                          <span class="min-w-0 flex-1 truncate">8 variables configured</span>
                          <Icon name="settings" class="size-3.5 shrink-0 text-muted" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div
                    v-for="section in activeSections"
                    :key="section.title"
                    class="border-b border-line"
                  >
                    <p class="px-3 pt-3 pb-1 text-[13px] font-semibold">{{ section.title }}</p>
                    <div class="space-y-1.5 px-3 pb-3">
                      <div
                        v-for="row in section.rows"
                        :key="row.label"
                        class="flex w-full min-w-0 items-center gap-3"
                      >
                        <span class="w-[68px] shrink-0 text-[13px] text-muted">{{ row.label }}</span>

                        <span
                          v-if="row.toggle"
                          class="flex h-8 min-w-0 flex-1 items-center rounded-lg bg-subtle p-0.5"
                        >
                          <button
                            v-for="(opt, i) in row.toggle"
                            :key="opt"
                            type="button"
                            class="flex h-7 flex-1 items-center justify-center rounded-md text-[12px] font-medium transition-colors"
                            :class="
                              row.activeIndex === i ? 'bg-surface text-ink shadow-xs' : 'text-muted'
                            "
                            @click="row.activeIndex = i"
                          >
                            {{ opt }}
                          </button>
                        </span>

                        <div v-else-if="row.swatch" class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu(`${section.title}-${row.label}`)"
                          >
                            <span
                              class="size-3.5 shrink-0 rounded border border-line-strong"
                              :style="{ background: row.swatch }"
                            />
                            <span class="flex-1 truncate text-left">{{ row.value }}</span>
                          </button>
                          <div
                            v-if="openMenu === `${section.title}-${row.label}`"
                            class="absolute top-full right-0 z-40 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-2 shadow-lg"
                          >
                            <button
                              v-for="color in SWATCHES"
                              :key="color"
                              type="button"
                              class="size-5 rounded border border-line-strong"
                              :style="{ background: color }"
                              @click="chooseSwatch(row, color)"
                            />
                          </div>
                        </div>

                        <div v-else-if="row.options" class="relative min-w-0 flex-1">
                          <button
                            type="button"
                            class="flex h-8 w-full items-center justify-between rounded-lg bg-subtle px-2.5 text-[13px] transition-colors hover:bg-line/60"
                            @click="toggleMenu(`${section.title}-${row.label}`)"
                          >
                            <span class="truncate">{{ row.value }}</span>
                            <Icon name="chevron-down" class="size-3.5 shrink-0 text-muted" />
                          </button>
                          <div
                            v-if="openMenu === `${section.title}-${row.label}`"
                            class="absolute top-full left-0 z-40 mt-1 w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
                          >
                            <button
                              v-for="opt in row.options"
                              :key="opt"
                              type="button"
                              class="flex w-full items-center rounded px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-subtle"
                              :class="opt === row.value ? 'font-semibold text-brand' : ''"
                              @click="chooseOption(row, opt)"
                            >
                              {{ opt }}
                            </button>
                          </div>
                        </div>

                        <span
                          v-else
                          class="flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-subtle px-2.5 text-[13px]"
                        >
                          <Icon
                            v-if="row.icon"
                            :name="row.icon"
                            class="size-3.5 shrink-0 text-muted"
                          />
                          <span
                            class="min-w-0 flex-1 truncate"
                            :class="row.muted ? 'text-muted' : ''"
                          >
                            {{ row.value }}
                          </span>
                          <Icon
                            v-if="row.trailingIcon"
                            :name="row.trailingIcon"
                            class="size-3.5 shrink-0 text-muted"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </aside>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.select-fade-enter-active,
.select-fade-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}
.select-fade-enter-from,
.select-fade-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

/* Uniform press feedback across every button in this component — a single rule
   here instead of touching each button's own Tailwind class list. Combines the
   transition properties those buttons already relied on (color/background/
   border/shadow via transition-colors or transition-shadow utilities) with the
   new transform, since only one `transition` declaration can win per element. */
button {
  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    transform 100ms ease;
}
button:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .select-fade-enter-active,
  .select-fade-leave-active,
  button {
    transition: none;
  }
  button:active {
    transform: none;
  }
}
</style>
