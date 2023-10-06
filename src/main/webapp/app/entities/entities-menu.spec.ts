import { vitest } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import EntitiesMenu from './entities-menu.vue';

type EntitiesMenuComponentType = InstanceType<typeof EntitiesMenu>;

describe('EntitiesMenu', () => {
  let translationService;

  beforeEach(() => {
    translationService = { loadTranslations: vitest.fn() };
  });

  describe('using microfrontendI18n', () => {
    beforeEach(() => {
      shallowMount(EntitiesMenu, {
        global: {
          stubs: {
            'b-dropdown-item': true,
            'font-awesome-icon': true,
          },
          provide: {
            translationService,
            microfrontendI18n: true,
            currentLanguage: ref('en'),
          },
        },
      });
    });

    it('should load translations', () => {
      expect(translationService.loadTranslations).toHaveBeenCalled();
    });
  });

  describe('not using microfrontendI18n', () => {
    beforeEach(() => {
      shallowMount(EntitiesMenu, {
        global: {
          stubs: {
            'b-dropdown-item': true,
            'font-awesome-icon': true,
          },
          provide: {
            translationService,
            microfrontendI18n: false,
            currentLanguage: ref('en'),
          },
        },
      });
    });

    it('should not load translations', () => {
      expect(translationService.loadTranslations).not.toHaveBeenCalled();
    });
  });
});
