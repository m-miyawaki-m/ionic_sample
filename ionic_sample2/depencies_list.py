import json
import csv

# package-lock.json のパス
package_lock_file = 'C:/Development/ionic/ionic_sample2/package-lock.json'

# 出力する CSV ファイルのパス
output_csv = 'C:/Development/ionic/ionic_sample2/dependencies_list.csv'

# CSVファイルのヘッダ
csv_header = ['Package Name', 'Version', 'Dependency Name', 'Dependency Version']

# package-lock.json を解析して依存関係を抽出
def extract_dependencies(package_lock_file):
    with open(package_lock_file, 'r', encoding='utf-8') as file:
        # JSON の読み込み
        data = json.load(file)

        dependencies = []
        
        # packages セクションから必要な情報を取得
        for package_path, package_info in data.get('packages', {}).items():
            if package_path.startswith('node_modules/'):
                package_name = package_path.split('/')[1]
                version = package_info.get('version')
                
                # 依存関係がある場合、再帰的に取り出す
                if 'dependencies' in package_info:
                    for dep_name, dep_version in package_info['dependencies'].items():
                        dependencies.append([package_name, version, dep_name, dep_version])
        
        return dependencies

# CSV に書き込む
def save_to_csv(dependencies, output_csv):
    with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(csv_header)  # ヘッダを出力
        writer.writerows(dependencies)  # 依存関係の情報を出力

    print(f"Dependencies have been saved to {output_csv}.")

# 依存関係を抽出して CSV に保存
dependencies = extract_dependencies(package_lock_file)
save_to_csv(dependencies, output_csv)
