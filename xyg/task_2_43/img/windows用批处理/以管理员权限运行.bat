@echo off
mode con lines=27 cols=60
:main
cls
color 2f
echo �̡�    �̡�  �̡̡�      �̡̡̡�  �̡̡̡̡�    �̡̡̡�
echo   ��    ��  ��      ��  ��      ��  ��  ��  ��  ��      ��
echo   ��    ��  ��      ��  ��              ��      ��
echo   �̡̡̡�  ��      ��    �̡�          ��        �̡�
echo   ��    ��  ��      ��        ��        ��            ��
echo   ��    ��  ��      ��          ��      ��              ��
echo   ��    ��  ��      ��  ��      ��      ��      ��      ��
echo �̡�    �̡�  �̡̡�    �̡̡̡�      �̡̡�    �̡̡̡�
echo.----------------------------------------------------------- 
echo.����360�Ȱ�ȫ������ѣ��빴ѡ����Ͳ������ѣ�
echo.
echo.���棺ִ�и��������ԭhosts�������ǣ�
echo.
echo.��D����   LAOD.CN    LAOD.ORG    LAOD.TOP
echo.2016 ���ø��µ�ַ��
echo.http://laod.cn/hosts/2016-google-hosts.html
color 2e
echo.-----------------------------------------------------------
echo.��ѡ��ʹ�ã�
echo.
echo.         1.ʹ�ô�ǽhost
echo.
echo.         2.�ָ���ʼhost	
echo.-----------------------------------------------------------

set /p choice=������:

echo.
  if %choice%==1 goto host DNS
  if %choice%==2 goto CL
     cls
     goto end
:host DNS
cls
color 2f
copy "%~dp0hosts" "%SystemRoot%\System32\drivers\etc\hosts"
ipconfig /flushdns
echo.-----------------------------------------------------------
echo.
echo ��D��ϲ�������Ǳ���hosts��ˢ�±���DNS��������ɹ�!
echo.
echo ����ȥ��Google��Twitter��Facebook��Gmail���ȸ�ѧ���ɣ�
echo.
@Pause
goto end

:CL
cls
color 2f
@echo 127.0.0.1 localhost > %SystemRoot%\System32\drivers\etc\hosts
echo ��ϲ����hosts�ָ���ʼ�ɹ�!
@Pause
goto end