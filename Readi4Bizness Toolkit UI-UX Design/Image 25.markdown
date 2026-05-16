---
name: Readi4Bizness Internal Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  status-planned: '#94A3B8'
  status-in-progress: '#3B82F6'
  status-blocked: '#EF4444'
  status-shipped: '#10B981'
  canvas-bg: '#F8FAFC'
  governance-gold: '#F59E0B'
  border-subtle: '#E2E8F0'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 60px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
  container-max: 1280px
  canvas-sidebar-left: 260px
  canvas-sidebar-right: 320px
---

Below is a **draft `DESIGN.md`** that defines the **three contextual UI/UX concepts** for your web app: **External Web App**, **Internal Web App**, and **Canvas App**. This document is written to be developer‑ and designer‑friendly, suitable for a repo root or `/docs` folder, and aligned with the system you’ve designed (Business Blueprint, Strategists, Builders, Governance, Execution).

You can copy‑paste this directly as `DESIGN.md`.

---

# **DESIGN.md**

## **UI/UX Architecture for the Digital Product Business OS**

---

## **Overview**

This document defines the **three contextual UI/UX concepts** used throughout the application:

1. **External Web App** – Public‑facing, visitor‑oriented experiences  
2. **Internal Web App** – Logged‑in, operational control center  
3. **Canvas App** – Deep‑focus, creation and strategy workspaces

These are not three separate products—they are **three UX contexts** that work together to support the full lifecycle of a digital product business.

The guiding principle:

**Visitors explore. Builders operate. Strategists think.**

Each context optimizes for a different cognitive mode, user intent, and system responsibility.

---

## **Design Principles (Global)**

All three contexts must adhere to the following principles:

* **Clarity over cleverness** – Complex systems should feel understandable  
* **Progressive disclosure** – Show only what is necessary at each step  
* **State awareness** – Users should always know *where they are* and *what stage they are in*  
* **Governance without friction** – Rules, compliance, and approvals should guide—not block—work  
* **Single source of truth** – The Business Blueprint anchors all views

---

## **1\. External Web App**

### **(Public‑Facing Experience)**

### **Purpose**

The External Web App is the **platform's marketing and credibility surface**. It is where non‑users, prospects, and stakeholders encounter the product for the first time.

### **Primary Users**

* Prospective customers  
* Partners & affiliates  
* Search engine visitors  
* Clients reviewing deliverables  
* Shared blueprint viewers (read‑only)

### **Core Responsibilities**

* Communicate value proposition  
* Explain how the system works  
* Showcase outcomes and use cases  
* Support SEO, blogging, and content discovery  
* Provide conversion paths (sign‑up, demo, lead capture)

### **UX Characteristics**

* Narrative‑driven layouts  
* Scroll‑based storytelling  
* Strong visual hierarchy  
* Minimal controls  
* High emphasis on trust and clarity

### **Typical Surfaces**

* Marketing pages  
* Pricing  
* Blog & SEO content  
* Shared Business Blueprint (read‑only)  
* Public landing pages  
* Affiliate program overview pages

### **Design Constraints**

* No operational controls  
* No raw data exposure  
* No editing or strategy tools  
* Compliance & disclosure content visible by default

---

## **2\. Internal Web App**

### **(Operational Control Center)**

### **Purpose**

The Internal Web App is the **command center** for managing the business system. It is dashboard‑oriented and responsibility‑driven.

### **Primary Users**

* Product creators  
* Agency operators  
* Internal teams  
* Approved partners (limited scopes)

### **Core Responsibilities**

* Orchestrate systems and workflows  
* Monitor progress and performance  
* Manage dependencies and approvals  
* Execute strategy at scale  
* Maintain governance and compliance

### **UX Characteristics**

* Dashboard‑first layouts  
* Clear navigation hierarchy  
* Statup�$Y�]�[�RH
[��Y�[���ܙ\��؛���Y��\Y
H����8�$]��$]��[��[����Y��X�Y[��Hݙ\�Y\�]X�����
��\X�[�\��X�\ʊ����\���\��YH���\�[�\���Y\�[�
[�\�X�]�Hݙ\��Y]�H����]Y�\��]]�
�XY8�$[ۛH�[[X\�Y\�H��\��ܛX[��H\���\�����۝[��[[�\����Y��[X]HX[�Y�[Y[�����\X[��H[�[�����Y�X�][ۜ�	��[Z[�\�����
���^HRH]\��ʊ����X�\�[��\���]�]\�[�X�]ܜ����[\���H�[\ZYۋ���X���[��[��[\��[�����\���\��X�YX\�H��[�ٙ���Y�X�][ۜ�����x�$X]�\�H\�Z\��[ۜ����
��\�Yۈ�ۜ��Z[�ʊ����]��Y�\�X[�]\������ݙ\��Y�]ܙX]]�H�۝�������\^Y]�]\�[�ٙ���[��\�\��[�^\��\�\��H]Y]�Z[�KKB����
�����[��\�\
�������
����]Y�H	�ܙX][ۈ�ܚ��X�JJ�������
��\���J����H�[��\�\\�H
��Y\8�$Y���\�[��\�ۛY[�
���\�H[��[��[��[��[�ܙX][ۈ\[��\�\��\�H\�\���Z[\�Yۋܚ]K[��X\�ۋ���H�[��\�\�[Z^�\��܈
����ۚ]]�H��ʊ�������
���[X\�H\�\�ʊ����ܙX]ܜ�����]Y�\����ܚ]\������[�\�Yۙ\����Y��[X]H��X�ܘ]ܜ�
[Z]Y[�JB�����
���ܙH�\�ۜ�X�[]Y\ʊ�����[�\�]H[�Y]�]]���^ܙH��]Y�H�[ۜ����Z[[��[��\��]]�\���\��ܛH�]�Y]��[�\�ݘ[���ܙX]H\��]��]�]\��X�[ۂ�����
��V�\�X�\�\�X�ʊ�����[8�$X�YY�ܚ��X�H��Z[�[X[���YH���۝^X[���\����[�[�H��[Y[��	��ZY[��H��]]��]�H[��\��[ۚ[�����Yx�$X�x�$\�YH��\\�\�ۜ����
��\X�[�\��X�\ʊ�����\�[�\���Y\�[�Y]܈���۝[�ܙX][ۈ��]Y�\��[��\������XZ�\�Y]܈����[�Y[�]H�]XZ�\���Y��[X]H[�X�[Y[��]�Z[\����X��]H[�Y�H[��\������\X[��H�]�Y]��[��\���ܙX]܈�Y��[X]H�Y��]�Y]����
���^HRH]\��ʊ�����[��\��]�X�[ۜ�[��XYو[�[���[�[�H�Y��\�[ۜ�[��XYو�\���^[�X�H�۝^[�[�
�Y��Z[
H��Y�8�$X[��ܙY��X�\�K�[�\��$Y���\�Y�ܚ���8�'^Z[��x�'H��\��܈RHX�\�[ۜ����
��\�Yۈ�ۜ��Z[�ʊ�������ؘ[�]�Y�][ۈ�]\�����\��ܛX[��H\���\��[��YH�[��\���]��Y�ܘ�Y�\8�$X�x�$\�\�������\�\��H\�\�Y�[��H[�Y][��KKB����
����H�YH�۝^��ܚ���]\�����^\��[�X�\�8���
�۝�\��[ۈ�\��ݙ\�JH�[�\��[�X�\�8���
ܘ�\��][ۈ��X��[��H��[��\�\�8���
ܙX][ۈ���]Y�JH�[�\��[�X�\�8���
^X�][ۈ�[ۚ]ܚ[��H�^\��[�X�\��H\�\��]\�[H
��[ݙ\��]�Y[��۝^ʊ�\�Z\���H[�[�[��[��\˂��KKB����
���\�[�\���Y\�[�\�H[��܊����H
���\�[�\���Y\�[�
��^\��[�[�YH�۝^��]�[��\��Z]�[܎����۝^�Y\�[�[�H�KKKKHKKKKH�^\��[�XY8�$[ۛK�\��]]�H�[�\��[[�\�X�]�HX\�]\��$X]�\�H��[��\�Y]X�K�X\�ۚ[���$ZX]�H��\�[��\�\�
���\�[H��\�[��J��Xܛ���H\���KKB����
��X��\��X�[]H	���ۚ]]�H�Y
�����^\��[�X��\��X�K�Y�[��\��$Y��Y[�K����ۚ]]�H�Y��[�\��[�[�\�]H��ۚ]]�H�Y�[Z^�Y�܈�\X]\�\�����[��\ΈY���ۚ]]�H�Y�[Z^�Y�܈���\�[�\��\�Yۙ\����[
���]�\�Z^�۝^�[�ۙH�ܙY[������KKB����
���۸�$Q��[ʊ���\��\�[H^X�]H]��Y΂���ۙx�$\�ܙY[�8�'�]�\�][���'H\���\����ݙ\��$X]]�X][ۈ�]�]^[�][ۈ��Y[��\�[HX�\�[ۜ����X�(	&���&V�f��'0����Р�22��f�����FR����F��2F�&V^(	6��FW�BFW6�v�V�&�W2F�RƖ6F���F�66�Rg&�Ӡ���6���7&VF�'2(i"vV�6�W2(i"&VwV�FVB��GW7G&�W2 �v�F��WBg&v�V�F��rF�RW6W"W�W&�V�6Rࠢ��W�FW&��W����2���FW&���W&FW2�6�f27&VFW2⢠��F��26W&F����2v�B���w26���W�'W6��W72�2F�fVV�W6&�R&F�W"F���fW'v�V�֖�rࠢ��Р�&V��r�2F�R��6���WFR�&�GV7F���(	&VG�W��6��⢢�bDU4�t���F6�fW&��s������T�7FFR����v��6�fVGW&W2ƗfR��v��6�6��FW�B� �"���W&֗76���2b&��W2��FV¢� �2����f�vF���66�V�f�"V6�6��FW�B����F��2�2w&�GFV�F�&RG&�VBF�&V7Fǒ��F���W"&W�26V7F���2v�F���DU4�t���F�6��F��V��rg&��F�R&Wf��W2F�7V�V�B� ���W��7F��r��FW&��'F�f7G2FVf��RF��2���r�6�F��2�2F�R��6���6�T�7�7FV�6��G&7B��f�"V�v��VW&��r�BFW6�v�ࠢ��Р�2��DU4�t���B�6��F��VVB�����22��E��T�5DDR�������v��6�fVGW&W2ƗfR��v��6�6��FW�B����F�RƖ6F����2��FV�F����ǒF�f�FVB��F���F�&VRU�6��FW�G2��� �fVGW&W2�W7B���WfW"�V�7&�726��FW�G2��V��W72W�Ɩ6�FǒFW6�v�VB27&�7
E���ѕ�Ёɕ���E����٥��̸((���((������иā�ѕɹ���]�������P�����ɔ�5����((���AՉ������I����E=��䀼���ٕ�ͥ���E����͕����()������ɔ���Mхє��)�����������������)��5�ɭ�ѥ���ݕ�ͥє�����́���r��)��1�����������́���r��)��AՉ����������M<����ѕ�Ф����r��)��������є��ɽ�Ʌ���ٕ�٥�܁���r��)��5�ɭ�����������ѥ��̀��Չ����٥�ܤ����r��)��M��ɕ��	�ͥ���́	�Օ�ɥ�Ѐ�ɕ���E���䤁���r��)���͔���Ց��̀��ѕ�ѥ������́���r��)��1���������ɔ���ɵ́���r��)��Aɥ���������́���r��)��1�������M���������r��)�����䁕��ѥ���ѽ��̨�����Z� |
| **Dashboards / analytics** | 🚫 |
| **Strategists / builders** | 🚫 |

**Design intent:**  
 The External App answers *“Why should I trust this?”* and *“What does this do<�'J��]�]�\�[���\��
��'���H�\�]H\�(	Ҡ����Р�222��B�"��FW&��vV"(	BfVGW&R��������6��G&��6V�FW"��W&F���2����F�&��r������fVGW&R�7FFR��������������������F6�&�&B�)�R���'W6��W72&�VW&��B���FW&7F�fRf�Wr��)�R���&�GV7B&Vv�7G'��)�R���7G&FVw�7V��&�W2�)�R���6��FV�B6�V�F'2�)�R���6��v���vV�V�B�)�R���&��rW&f�&��6RF6�&�&B�)�R���ff�ƖFRW&f�&��6RF6�&�&B�)�R���6��Ɩ�6R7FGW2�V�2�)�R�����F�f�6F���2b&V֖�FW'2�)�R���&��R�B66W72��vV�V�B�)�R�����FVWVF�F��r�7&VF��⢢�	�����������JE��ɴ��ɥѥ�����ͥ��������~j���((���ͥ�����ѕ��訨��(�Q���%�ѕɹ���������ݕ�̀��q]��ӊé����������* and *“What’s blocked<�'J���KKB�����
�����[��\�\8�%�X]\�HX\
������ܙX][ۈ���]Y�H����\�[�JJ�����X]\�H�]H�KKKKHKKKKH��\�[�\���Y\�[�Y]܈8�!H��۝[�ܙX][ۈ��]Y�\�8�!H����XZ�\�Y]܈8�!H���[�Y[�]H�]XZ�\�8�!H��X��]HXZ�\�[��\�8�!H�Y��[X]H[�X�[Y[��]�Z[\�8�!H�Y��[X]H�Y��]�Y]�8�!H���\X[��H�]�Y]��[��\�8�!H�RH�X\�ۚ[��[�[�8�!H�[�[�H��[Y[��	��Y��\�[ۜ�8�!H�
���ؘ[\���\�ʊ�<'���
���[�YZ[��][��ʊ�<'������\�Yۈ[�[�����H�[��\�[���\��
��'�]��[�HXZ�O��'J�[�
��'����[\�����XY܈�ܚ���'J���KKB����
��W�T�RT��SӔ�	���T�S�S
����H\�Z\��[ۈ�\�[H\�
����x�$X]�\�J��
���۝^8�$X]�\�J��[�
��X\�8�$\�]�[Y�H�HY�][
�����KKB�����
��K�H�ܙH��\ʊ�������
���ۙ\�������[X��\��Xܛ���[�۝^����[�ݙ\��YH�ݙ\��[��H���[�\�ݙH]�\�][�����[�X[�Y�H�[[����\�^ܝ�����
����]Y�\�
������[�[��\�X��\�����[��[�\�]H[�Y]��]Y�Y\����[�����H�[��\����[���X�\��]�]\�ݘ[
[�\��ܘ[�Y
B������
��ܙX]܊������[��\�X��\��
�۝[���[��X��]K���H���[��X�Z]�Y�����[���\�ݙH�ۈ�ܚ�����
��Y��[X]J�����[Z]Y�[��\�X��\��
���$XܙX][ۈ�ܚ��X�HۛJH���[��X�Z]�Y�����[����YH[�\��[\���\��܈��]Y�B������
���]�Y]�\����\X[��J������[��\��]�Y]�X��\�����[�\�ݙK����܈�\]Y\�Y]����[���ܙX]H�]�\��]�����
��[�[\�
�[ۘ[
J�����[�\��[\X��\��ۛH���XY8�$[ۛH\���\��[�[��Y��KKB�����
��K��\�Z\��[ۜ��H�۝^
������H8�����۝^8���^\��[[�\��[�[��\��KKKKHKKKKHKKKKHKKKKH��ۙ\�8�!H8�!H8�!H���]Y�\�8�!H8�!H8�!H�ܙX]܈8�!H<'��8�!H�Y��[X]H8�!H<'��8��;�#�[Z]Y��]�Y]�\�8�!H8�!H8�!H
�]�Y]�ۛJH�[�[\�8�!H8�!H
�XY8�$[ۛJH<%�����)�����ff�ƖFR6�f266W72�26��7G&��VBF�76�v�VB6���&�&F���6��G2��ǒ⠠���Р�222��R�2v�fW&��6R'V�W2�������&��R6�V&Ɨ6�6��FV�Bv�F��WB&�f�V��W72W�Ɩ6�FǒW&֗GFVB ��6��Ɩ�6R&��6�W'2�fW'&�FR��&��W2W�6WB�v�W" ����&�f�2&R��vvVB ���fW'&�FW2&WV�&R&V6�ࠢ��Р�22��e���d�tD���44�T�������W"6��FW�B�����f�vF����2��6��FW�N(	��6�VB��� �W6W'2�WfW"6VRƖ�2f�"F���2F�B&V���rF���F�W"6��FW�Bࠢ��Р�222��b�W�FW&��vV"�f�vF��⢠����&��'��b��������R ����r�Bv�&�2 ��W6R66W2 ��&��r ��&�6��r ��ff�ƖFW2 ��6�v����vWB7F'FV@����f��FW"������Vv� ��&�f7� ��F�66��7W&W2 ��6��F7@��)�R6���R��'&F�fR�4T�E�ɥ�����((���((������ظȁ%�ѕɹ���]������9�٥��ѥ����((��M����9�٥��ѥ����((���͡���ɐ��(��	�ͥ���́	�Օ�ɥ�Ѐ�(��Aɽ�Ս�̀�(���������̀�(����ѕ�Ѐ�(��������ѕ̀�(��A�ə�ɵ������(�������������(��9�ѥ����ѥ��̀�(��M��ѥ���((��Q���	�Ȩ�((���ѥٔ����������͕���ѽȀ�(������̽�������̀�(��U͕ȁɽ���������ѽ�(+�r�=��Ʌѥ��������ɥ�䁽ٕȁ�ɕ�ѥ٥��((���((������ظ́��م́���9�٥��ѥ����((��1��ЁI�����M��Ս��ɔ���((��	�Օ�ɥ�ЁM��ѥ��̀�(����ѕ�Ё=�ѱ�����(���͕�̀�(��9�ѕ�((��Q���	�Ȩ�((����ѕ�Ё������(��M�ٔ��хє��(��I�٥�܁�х���((��I���ЁI�������ѕ�ЁQ���̤��((��$�ɕ�ͽ������(��	Ʌ����ձ�̀�(��������������ѕ̀�(���������(+�r�ձ��E����̰���܁����Ʌ�ѥ���������ݽɬ������((���((������p��I=MO�E=9QaP�QI9M%Q%=9L��()QɅ�ͥѥ��́�ɔ���ѕ�ѥ�����((��%�ѕɹ����H���م�胊q��Ѐ��ɕ�ї�t��(����م̃�H�%�ѕɹ��胊qMՉ��Ѐ����ɽٗ�t��(��%�ѕɹ����H��ѕɹ��胊qY��܁AՉ�����

Each transition:

* Preserves context  
* Explains the mode switch  
* Protects state

---

## **8\. FINAL UX CONTRACT**

**External** explains  
 **Internal** orchestrates  
 **Canvas** creates

Breaking this contract is considered a **design bug**.

---

## **✅ DESIGN SYSTEM STATUS: COMPLETE**

With:

* Three clear UX contexts  
* A strict UI state map  
* A role‑aware permissions system  
* Separate navigation schemas

Your application now has:

* Enterprise‑grade clarity  
* Agency‑safe governance  
* Creator‑friendly flow  
* Scalable UX discipline

